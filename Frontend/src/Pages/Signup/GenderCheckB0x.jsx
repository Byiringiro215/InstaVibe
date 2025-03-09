import React from 'react'

const GenderCheckB0x = () => {
  return (
    <div className='flex mt-3'>
      <div className='form-control'>
        <label className={'label gap-2 cursor-pointer'}>
          <span className='label-text'>Male</span>
          <input type="checkbox" className='checkbox border-slate-900' />
        </label>
      </div>
      <div className='form-control'>
        <label className={'label gap-2 cursor-pointer'}>
          <span className='label-text'>Female</span>
          <input type="checkbox" className='checkbox border-slate-900'   />
        </label>
      </div>
    </div>
  )
}

export default GenderCheckB0x
