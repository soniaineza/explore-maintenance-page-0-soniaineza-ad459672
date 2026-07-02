export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function getPayloadConfig() {
  const pathParts = ['..', '..', '..', 'payload.config']
  const configPath = new URL(pathParts.join('/') , import.meta.url)
  const configModule = await import(configPath.href)
  return configModule.getPayloadConfig as () => Promise<any>
}

async function handleAdminRequest(request: Request) {
  try {
    const payloadPackage = 'payload'
    const { handleEndpoints } = await import(payloadPackage)
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
