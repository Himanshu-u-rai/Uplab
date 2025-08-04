'use client'

import { useEffect } from 'react'

interface SchemaComponentProps {
  schema: object | object[]
  id?: string
}

export default function SchemaComponent({ schema, id }: SchemaComponentProps) {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id || `schema-${Date.now()}`
    
    // Handle both single schema and array of schemas
    const schemaData = Array.isArray(schema) ? schema : [schema]
    
    // Add @context to each schema object
    const contextualizedSchema = schemaData.map(item => ({
      '@context': 'https://schema.org',
      ...item
    }))
    
    script.textContent = JSON.stringify(
      contextualizedSchema.length === 1 ? contextualizedSchema[0] : contextualizedSchema,
      null,
      2
    )
    
    // Add to head
    document.head.appendChild(script)
    
    // Cleanup function
    return () => {
      const existingScript = document.getElementById(script.id)
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [schema, id])
  
  return null // This component doesn't render anything
}

// Higher-order component for pages that need schema
export function withSchema<T extends {}>(
  Component: React.ComponentType<T>,
  getSchema: (props: T) => object | object[]
) {
  return function WrappedComponent(props: T) {
    const schema = getSchema(props)
    
    return (
      <>
        <SchemaComponent schema={schema} />
        <Component {...props} />
      </>
    )
  }
}
