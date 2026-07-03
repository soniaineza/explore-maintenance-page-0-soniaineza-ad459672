import { RootPage } from '@payloadcms/next/views'
import config from '@/payload.config'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const Page = async ({ params, searchParams }: Args) => {
  const { slug, ...rest } = await params
  return (
    <RootPage
      config={config}
      importMap={importMap}
      params={Promise.resolve({ segments: slug ?? [], ...rest })}
      searchParams={searchParams}
    />
  )
}

export default Page
