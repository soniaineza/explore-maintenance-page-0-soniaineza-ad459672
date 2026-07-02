import { RootPage } from '@payloadcms/next/views'
import config from '@/payload.config'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const Page = ({ params, searchParams }: Args) => (
  <RootPage
    config={config}
    importMap={importMap}
    params={params}
    searchParams={searchParams}
  />
)

export default Page
