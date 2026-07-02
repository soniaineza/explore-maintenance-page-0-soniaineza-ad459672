export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function handleAdminRequest(request: Request) {
  try {
    const [{ handleEndpoints }, { getPayloadConfig }] = await Promise.all([
      import('payload'),
      import('../../../payload.config'),
    ])
    const config = await getPayloadConfig()
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
