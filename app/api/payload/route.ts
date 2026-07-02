export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function getPayloadConfig() {
  const configModule = await import('../../../payload.config')
  return configModule.getPayloadConfig as () => Promise<any>
}

async function handlePayloadRequest(request: Request) {
  try {
    const { handleEndpoints } = await import('payload')
    const loader = await getPayloadConfig()
    const config = await loader()

    return handleEndpoints({ request, config })
  } catch (error) {
    console.error('Payload API error', error)
    return new Response(process.env.NODE_ENV === 'development' ? String(error) : 'Internal Server Error', {
      status: 500,
    })
  }
}

export async function GET(request: Request) {
  return handlePayloadRequest(request)
}

export async function POST(request: Request) {
  return handlePayloadRequest(request)
}

export async function PATCH(request: Request) {
  return handlePayloadRequest(request)
}

export async function DELETE(request: Request) {
  return handlePayloadRequest(request)
}

export async function PUT(request: Request) {
  return handlePayloadRequest(request)
}

export async function OPTIONS(request: Request) {
  return handlePayloadRequest(request)
}
