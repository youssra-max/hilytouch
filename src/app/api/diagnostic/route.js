import { NextResponse } from "next/server";

// POST /api/diagnostic — skin diagnostic quiz
export async function POST(request) {
  try {
    const body = await request.json();
    const { skinType, concerns, age, routine } = body;

    if (!skinType || !concerns || concerns.length === 0) {
      return NextResponse.json(
        { error: "Veuillez compléter le questionnaire." },
        { status: 400 },
      );
    }

    // Mock diagnostic result
    const recommendations = {
      skinProfile: {
        type: skinType,
        concerns: concerns,
        summary: getSkinSummary(skinType, concerns),
      },
      recommendedProducts: getRecommendations(skinType, concerns),
      routineTips: getRoutineTips(skinType),
    };

    return NextResponse.json(recommendations);
  } catch {
    return NextResponse.json(
      { error: "Erreur lors du diagnostic." },
      { status: 500 },
    );
  }
}

function getSkinSummary(type, concerns) {
  const summaries = {
    seche:
      "Votre peau a besoin d'une hydratation intense et d'actifs nourrissants. Privilégiez les textures riches et les huiles botaniques.",
    grasse:
      "Votre peau produit un excès de sébum. Optez pour des soins matifiants et des textures légères non comédogènes.",
    mixte:
      "Votre peau nécessite un équilibre entre hydratation et contrôle du sébum. Adaptez vos soins zone par zone.",
    normale:
      "Votre peau est équilibrée. Maintenez cet équilibre avec des soins doux et protecteurs.",
    sensible:
      "Votre peau est réactive et a besoin de soins apaisants, sans parfum et hypoallergéniques.",
  };
  return summaries[type] || summaries["normale"];
}

function getRecommendations(type, concerns) {
  const baseProducts = [
    {
      id: 6,
      title: "Lait Nettoyant",
      reason: "Nettoyage doux adapté à tous types de peau",
    },
  ];

  if (type === "seche") {
    baseProducts.push(
      {
        id: 3,
        title: "Huile de Nuit Précieuse",
        reason: "Nutrition intense pendant la nuit",
      },
      {
        id: 2,
        title: "Baume Botanique",
        reason: "Hydratation profonde et durable",
      },
    );
  } else if (type === "grasse" || type === "mixte") {
    baseProducts.push(
      {
        id: 1,
        title: "Sérum Éclat Floral",
        reason: "Hydratation légère et éclat",
      },
      {
        id: 7,
        title: "Crème de Jour",
        reason: "Protection légère et matifiante",
      },
    );
  } else {
    baseProducts.push(
      {
        id: 1,
        title: "Sérum Éclat Floral",
        reason: "Éclat et hydratation quotidienne",
      },
      {
        id: 3,
        title: "Huile de Nuit Précieuse",
        reason: "Régénération nocturne",
      },
    );
  }

  if (concerns.includes("rides")) {
    baseProducts.push({
      id: 3,
      title: "Huile de Nuit Précieuse",
      reason: "Action anti-rides prouvée",
    });
  }

  // Deduplicate by id
  const seen = new Set();
  return baseProducts.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
}

function getRoutineTips(type) {
  return {
    matin: [
      "Nettoyer avec un lait doux",
      "Appliquer un sérum adapté",
      "Hydrater avec une crème de jour",
      "Protéger avec un SPF 30+",
    ],
    soir: [
      "Double nettoyage (huile + lait)",
      "Appliquer un sérum réparateur",
      "Nourrir avec une huile ou crème de nuit",
      "Appliquer un soin contour des yeux",
    ],
  };
}
