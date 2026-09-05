import { validateCandidate, EvaluationResult } from '../policy/engine';

export function calculateConversionScore(candidate: any, evaluation: EvaluationResult, intent: string): number {
    let score = 0.5; // Base probability

    // The larger the discount perceived, the higher the score
    const perceivedDiscount = evaluation.customerValue - evaluation.finalPrice;
    if (perceivedDiscount > 0) {
        score += (perceivedDiscount / evaluation.customerValue) * 1.5; 
    }

    const hasService = evaluation.includedAddons.some(a => a.category === 'service');
    const hasAccessory = evaluation.includedAddons.some(a => a.category === 'accessory');

    if (intent === 'PRICE_SENSITIVE' && perceivedDiscount > 5000) {
        score += 0.2;
    }
    if (intent === 'ACCESSORY_REDUNDANCY' && !hasAccessory && hasService) {
        score += 0.3;
    }
    if (intent === 'WARRANTY_OBJECTION' && !hasService && hasAccessory) {
        score += 0.3;
    }

    return Math.min(score, 0.99);
}

export function scoreAndSelectOffer(candidates: any[], intent: string) {
  const evaluatedCandidates = candidates.map(c => {
    const evaluation = validateCandidate(c);
    let conversionScore = 0;
    let expectedProfit = 0;

    if (evaluation.isValid) {
        conversionScore = calculateConversionScore(c, evaluation, intent);
        expectedProfit = conversionScore * evaluation.margin;
    }

    return { ...c, evaluation, conversionScore, expectedProfit };
  });

  const validOffers = evaluatedCandidates.filter(c => c.evaluation.isValid);
  
  validOffers.sort((a, b) => b.expectedProfit - a.expectedProfit);
  
  return {
    selected: validOffers.length > 0 ? validOffers[0] : null,
    allEvaluations: evaluatedCandidates
  };
}
