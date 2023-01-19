import { LinkIcon } from '@heroicons/react/24/solid'

export default function FixedPart() {
  return (
    <>
      <div className='mt-6 cursor-pointer rounded-3xl bg-purple-600 bg-gradient-to-br from-[#5885e0] via-[#CF4D9E] to-[#EC7951] p-3'>
        <LinkIcon className='h-14 w-14 text-white' />
      </div>
      <h1 className='mb-10 text-xl font-semibold'>Make a Short Link</h1>
    </>
  )
}
