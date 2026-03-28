import { NextResponse } from 'next/server';

// POST /api/contact — receive contact form submissions
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires.' },
        { status: 400 }
      );
    }

    // In production, save to DB / send email here
    console.log('Contact form submission:', { name, email, subject, message });

    return NextResponse.json({ 
      success: true, 
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons sous 48h.' 
    });
  } catch {
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message.' },
      { status: 500 }
    );
  }
}
