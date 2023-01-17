"use client";

import {LinkIcon} from "@heroicons/react/24/solid";
import {usePostUrlMutation} from "@/utils/use-fetch";
import {FormEventHandler, useEffect, useState} from "react";

export default function Page() {
  const [url, setUrl] = useState('https://the-link-you-want-to-shorten.long')
  const postUrl = usePostUrlMutation();

  const urlToRedirect = postUrl.data ? `${window.location.origin}/${postUrl.data.id}` : null

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    postUrl.reset()
    const response = await postUrl.trigger({url});
    console.log(`The new id is`, response.id);
  };

  const [copied, setCopied] = useState(false)
  console.log({copied})
  useEffect(() => {
    if (copied) {
      const id = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(id)
    }
  }, [copied])
  const handleCopy = async () => {
    if (typeof urlToRedirect === "string") {
      await navigator.clipboard.writeText(urlToRedirect)
      setCopied(true)
    }
  };

  return (
    <div className="h-screen w-screen bg-zinc-100 grid place-items-center">

      <div className="bg-white w-full max-w-sm rounded-xl p-5 flex flex-col items-center space-y-5">
        <div
          className="cursor-pointer bg-purple-600 bg-gradient-to-br from-[#5885e0] to-[#EC7951] via-[#CF4D9E] p-3 rounded-3xl mt-6">
          <LinkIcon className="h-14 w-14 text-white"/>
        </div>
        <h1 className="text-xl mb-10 font-semibold">Make a Short Link</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="url"
            id="url"
            name="url"
            required
            className="w-full border rounded-lg border-gray-200 leading-[2.75rem] indent-4"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-purple-600 mt-4 bg-gradient-to-r from-blue-500 to-fuchsia-500 h-12 font-bold text-white rounded-lg hover:text-opacity-70"
          >
            Shorten it
          </button>
        </form>
        <div
          onClick={handleCopy}
          className="h-36 group bg-zinc-50 w-full border border-dashed border-zinc-300 hover:border-zinc-400 hover:bg-zinc-100 hover:cursor-pointer rounded-lg flex flex-col justify-center items-center text-xl hover:border-2"
        >
          {
            copied
              ? <p className='text-4xl font-semibold text-center'>Copied!</p>
              :
              <>
                <p>
                  {
                    copied
                      ? 'Copied!'
                      : (urlToRedirect ?? (postUrl.isMutating ? "..." : "Shortened link will be here"))}
                </p>
                <p className={`text-sm text-gray-400 mt-6 group-hover:underline ${!urlToRedirect && 'opacity-0'}`}>
                  Click to copy
                </p>
              </>
          }
        </div>
      </div>
    </div>
  );
}
