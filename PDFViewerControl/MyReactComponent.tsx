/* eslint-disable no-use-before-define */
import * as React from 'react'
import PDFViewer from './PDFViewer'

export interface IMyReactComponentProps {
  url?: string | undefined
}

const MyReactComponent: React.FC<IMyReactComponentProps> = (props) => {
  console.log('props', props)
  return (
    <>
      <PDFViewer url={props.url} />
    </>
  )
}
export default MyReactComponent
