import DocumentList from '@/components/DocumentList'
import PDFDropzone from '@/components/PDFDropzone'
import React from 'react'

const Uploads = () => {
  return (
    <div className='container mx-auto py-10 px-4 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        {/* PDFDropzone */}
        <PDFDropzone />
        {/* DocumentList */}
        <DocumentList/>
      </div>
    </div>
  )
}

export default Uploads