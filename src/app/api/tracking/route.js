import { NextResponse } from "next/server";

// POST /api/tracking — look up order tracking
export async function POST(request) {
  try {
    const body = await request.json();
    const { orderNumber, email } = body;

    if (!orderNumber || !email) {
      return NextResponse.json(
        {
          error: "Veuillez renseigner votre numéro de commande et votre email.",
        },
        { status: 400 },
      );
    }

    // Mock tracking data
    const mockTracking = {
      orderNumber,
      status: "En cours de livraison",
      estimatedDelivery: "28 Mars 2026",
      steps: [
        { label: "Commande confirmée", date: "24 Mars 2026", completed: true },
        {
          label: "Préparation en cours",
          date: "24 Mars 2026",
          completed: true,
        },
        { label: "Expédiée", date: "25 Mars 2026", completed: true },
        {
          label: "En cours de livraison",
          date: "26 Mars 2026",
          completed: true,
        },
        { label: "Livrée", date: "", completed: false },
      ],
      carrier: "Colissimo",
      trackingNumber: "COL" + orderNumber.replace(/\D/g, "") + "4829FR",
    };

    return NextResponse.json(mockTracking);
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de la recherche." },
      { status: 500 },
    );
  }
}
