import {useEffect, useRef} from 'react'

import {DateTimeInput, useFormValue} from 'sanity'

export function AutoUpdateDatetimeInput(props: any) {
  const {onChange, path} = props
  // Listen to multiple fields to detect document changes
  const title = useFormValue(['title']) as string | undefined
  const slug = useFormValue(['slug']) as {current?: string} | undefined
  const content = useFormValue(['content']) as unknown
  const metaDescription = useFormValue(['metaDescription']) as
    | string
    | undefined

  // Create a hash of key fields to detect changes
  const fieldsHash = JSON.stringify({title, slug, content, metaDescription})
  const previousHashRef = useRef<string>('')
  const isInitialMount = useRef(true)

  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      previousHashRef.current = fieldsHash
      return
    }

    // Update when any tracked field changes
    if (
      fieldsHash !== previousHashRef.current &&
      previousHashRef.current !== ''
    ) {
      const currentDate = new Date().toISOString()
      onChange({path, value: currentDate})
    }
    previousHashRef.current = fieldsHash
  }, [fieldsHash, onChange, path])

  return <DateTimeInput {...props} />
}
