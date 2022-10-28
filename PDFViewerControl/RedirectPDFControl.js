/* eslint-disable indent */
// eslint-disable-next-line no-use-before-define
import React from 'react'

const RedirectPDFControl = ({ url }) => {
  console.log('url', url)

  return (
    <>
      <a
        href={url}
        target="_blank"
        alt={url}
        title={url}
      >
        Redirect PDF</a>
    </>

  )
}
export default RedirectPDFControl
