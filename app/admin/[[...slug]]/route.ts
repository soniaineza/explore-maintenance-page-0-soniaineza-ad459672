export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const importModule = new Function('specifier', 'return import(specifier)')

async function getPayloadConfig() {
  const configPath = new URL('../../../payload.config', import.meta.url).href
  const configModule = await importModule(configPath)
  return configModule.getPayloadConfig as () => Promise<any>
}

async function handleAdminRequest(request: Request) {
  try {
    const { handleEndpoints } = await importModule('payload')
    const loader = await getPayloadConfig()
    const config = await loader()

    return handleEndpoints({ request, config })
  } catch (error) {
    console.error('Payload admin error', error)
    return new Response(process.env.NODE_ENV === 'development' ? String(error) : 'Internal Server Error', {
      status: 500,
    })
  }
}

export async function GET(request: Request) {
  return handleAdminRequest(request)
}

export async function POST(request: Request) {
  return handleAdminRequest(request)
}

export async function PATCH(request: Request) {
  return handleAdminRequest(request)
}

export async function DELETE(request: Request) {
  return handleAdminRequest(request)
}

export async function PUT(request: Request) {
  return handleAdminRequest(request)
}

export async function OPTIONS(request: Request) {
  return handleAdminRequest(request)
}
