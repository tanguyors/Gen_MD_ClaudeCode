import type { OptionItem } from '@/components/ui/option-card';
import {
  TARGET_USERS_OPTIONS,
  SUCCESS_KPIS_OPTIONS,
  PRIMARY_GOAL_OPTIONS,
  PRIORITY_QUALITIES_OPTIONS,
  BUSINESS_CONSTRAINTS_OPTIONS,
} from './option-data';

type ProjectType = 'website' | 'web' | 'mobile' | 'api' | 'saas' | 'infra' | 'data' | 'ai' | 'desktop' | 'other';

// ─── Target Users ──────────────────────────────────────────────────

const TARGET_USERS_WEBSITE: OptionItem[] = [
  { value: 'visitors', label: 'Website Visitors', label_fr: 'Visiteurs du site', pros: ['Large audience', 'SEO-driven'], pros_fr: ['Large audience', 'Guidés par le SEO'], cons: ['Low engagement'], cons_fr: ['Faible engagement'] },
  { value: 'ecommerce-shoppers', label: 'E-commerce Shoppers', label_fr: 'Acheteurs e-commerce', pros: ['High intent', 'Measurable'], pros_fr: ['Forte intention', 'Mesurable'], cons: ['Price-sensitive'], cons_fr: ['Sensibles au prix'] },
  { value: 'blog-readers', label: 'Blog / Content Readers', label_fr: 'Lecteurs de blog / contenu', pros: ['Organic traffic', 'Loyal'], pros_fr: ['Trafic organique', 'Fidèles'], cons: ['Hard to monetize'], cons_fr: ['Difficile à monétiser'] },
  { value: 'corporate-clients', label: 'Corporate Clients', label_fr: 'Clients corporate', pros: ['High value', 'Referrals'], pros_fr: ['Haute valeur', 'Bouche-à-oreille'], cons: ['Long sales cycle'], cons_fr: ['Cycle de vente long'] },
  { value: 'local-businesses', label: 'Local Businesses', label_fr: 'Commerces locaux', pros: ['Recurring need', 'Word of mouth'], pros_fr: ['Besoin récurrent', 'Bouche-à-oreille'], cons: ['Small budgets'], cons_fr: ['Petits budgets'] },
];

const TARGET_USERS_MOBILE: OptionItem[] = [
  { value: 'mobile-first-users', label: 'Mobile-first Users', label_fr: 'Utilisateurs mobile-first', pros: ['Growing market', 'Always connected'], pros_fr: ['Marché en croissance', 'Toujours connectés'], cons: ['Small screens'], cons_fr: ['Petits écrans'] },
  { value: 'on-the-go', label: 'On-the-go Users', label_fr: 'Utilisateurs en déplacement', pros: ['Frequent usage', 'Notifications'], pros_fr: ['Usage fréquent', 'Notifications'], cons: ['Short sessions'], cons_fr: ['Sessions courtes'] },
  { value: 'consumers', label: 'Consumers (B2C)', label_fr: 'Consommateurs (B2C)', pros: ['Massive market'], pros_fr: ['Marché massif'], cons: ['High churn', 'App store rules'], cons_fr: ['Fort taux d\'attrition', 'Règles des stores'] },
  { value: 'enterprise-mobile', label: 'Enterprise Workers', label_fr: 'Employés en entreprise', pros: ['High revenue', 'MDM support'], pros_fr: ['Revenus élevés', 'Support MDM'], cons: ['Complex deployment'], cons_fr: ['Déploiement complexe'] },
  { value: 'gamers', label: 'Gamers', label_fr: 'Joueurs', pros: ['High engagement', 'IAP revenue'], pros_fr: ['Fort engagement', 'Revenus IAP'], cons: ['High expectations'], cons_fr: ['Attentes élevées'] },
];

const TARGET_USERS_API: OptionItem[] = [
  { value: 'developers', label: 'Developers / Integrators', label_fr: 'Développeurs / Intégrateurs', pros: ['Self-serve', 'Community'], pros_fr: ['Autonomes', 'Communauté'], cons: ['High expectations'], cons_fr: ['Attentes élevées'] },
  { value: 'partner-systems', label: 'Partner Systems', label_fr: 'Systèmes partenaires', pros: ['Stable integrations', 'Revenue'], pros_fr: ['Intégrations stables', 'Revenus'], cons: ['SLA obligations'], cons_fr: ['Obligations SLA'] },
  { value: 'internal-services', label: 'Internal Microservices', label_fr: 'Microservices internes', pros: ['Known consumers', 'Controlled'], pros_fr: ['Consommateurs connus', 'Contrôlé'], cons: ['Tight coupling risk'], cons_fr: ['Risque de couplage'] },
  { value: 'third-party-apps', label: 'Third-party Apps', label_fr: 'Applications tierces', pros: ['Platform growth', 'Ecosystem'], pros_fr: ['Croissance plateforme', 'Écosystème'], cons: ['Versioning complexity'], cons_fr: ['Complexité de versioning'] },
  { value: 'iot-devices', label: 'IoT / Edge Devices', label_fr: 'Appareils IoT / Edge', pros: ['Growing market'], pros_fr: ['Marché en croissance'], cons: ['Constrained bandwidth'], cons_fr: ['Bande passante limitée'] },
];

const TARGET_USERS_SAAS: OptionItem[] = [
  { value: 'smbs', label: 'Small Businesses (SMB)', label_fr: 'Petites entreprises (PME)', pros: ['Large market', 'Fast decisions'], pros_fr: ['Grand marché', 'Décisions rapides'], cons: ['Price-sensitive', 'High churn'], cons_fr: ['Sensibles au prix', 'Fort taux de churn'] },
  { value: 'enterprise', label: 'Enterprise (B2B)', label_fr: 'Entreprise (B2B)', pros: ['High revenue', 'Long contracts'], pros_fr: ['Revenus élevés', 'Contrats longs'], cons: ['Slow sales cycle', 'SSO/compliance'], cons_fr: ['Cycle de vente long', 'SSO/conformité'] },
  { value: 'startups', label: 'Startups', label_fr: 'Startups', pros: ['Early adopters', 'Viral growth'], pros_fr: ['Early adopters', 'Croissance virale'], cons: ['Low budget', 'High churn'], cons_fr: ['Faible budget', 'Fort churn'] },
  { value: 'agencies', label: 'Agencies / Freelancers', label_fr: 'Agences / Freelances', pros: ['Multi-client usage', 'Advocacy'], pros_fr: ['Usage multi-clients', 'Ambassadeurs'], cons: ['Complex billing'], cons_fr: ['Facturation complexe'] },
  { value: 'developers', label: 'Developers', label_fr: 'Développeurs', pros: ['Self-serve', 'Community'], pros_fr: ['Autonomes', 'Communauté'], cons: ['High expectations'], cons_fr: ['Attentes élevées'] },
];

const TARGET_USERS_INFRA: OptionItem[] = [
  { value: 'devops', label: 'DevOps Engineers', label_fr: 'Ingénieurs DevOps', pros: ['Tech-savvy', 'Self-serve'], pros_fr: ['Technophiles', 'Autonomes'], cons: ['High expectations'], cons_fr: ['Attentes élevées'] },
  { value: 'sre', label: 'SRE / Platform Teams', label_fr: 'Équipes SRE / Plateforme', pros: ['Reliability focus', 'Budget'], pros_fr: ['Focus fiabilité', 'Budget'], cons: ['Conservative adoption'], cons_fr: ['Adoption conservatrice'] },
  { value: 'developers', label: 'Developers', label_fr: 'Développeurs', pros: ['Large audience', 'Self-serve'], pros_fr: ['Large audience', 'Autonomes'], cons: ['Varied skill levels'], cons_fr: ['Niveaux de compétence variés'] },
  { value: 'security-teams', label: 'Security Teams', label_fr: 'Équipes sécurité', pros: ['Compliance-driven'], pros_fr: ['Guidés par la conformité'], cons: ['Strict requirements'], cons_fr: ['Exigences strictes'] },
  { value: 'management', label: 'Engineering Management', label_fr: 'Direction technique', pros: ['Budget control', 'Decisions'], pros_fr: ['Contrôle du budget', 'Décisions'], cons: ['Less hands-on'], cons_fr: ['Moins technique'] },
];

const TARGET_USERS_DATA: OptionItem[] = [
  { value: 'data-analysts', label: 'Data Analysts', label_fr: 'Analystes de données', pros: ['SQL-savvy', 'Self-serve'], pros_fr: ['Maîtrisent le SQL', 'Autonomes'], cons: ['Need clean data'], cons_fr: ['Besoin de données propres'] },
  { value: 'data-scientists', label: 'Data Scientists', label_fr: 'Data scientists', pros: ['Advanced users', 'High value'], pros_fr: ['Utilisateurs avancés', 'Haute valeur'], cons: ['Specific tooling needs'], cons_fr: ['Besoins d\'outillage spécifiques'] },
  { value: 'business-intel', label: 'Business Intelligence', label_fr: 'Business intelligence', pros: ['Dashboard-driven', 'Recurring'], pros_fr: ['Guidés par les dashboards', 'Récurrent'], cons: ['Need polished UI'], cons_fr: ['Besoin d\'UI soignée'] },
  { value: 'product-teams', label: 'Product Teams', label_fr: 'Équipes produit', pros: ['Decision makers', 'Engaged'], pros_fr: ['Décideurs', 'Engagés'], cons: ['Non-technical'], cons_fr: ['Non-techniques'] },
  { value: 'c-level', label: 'Management / C-level', label_fr: 'Direction / C-level', pros: ['High impact'], pros_fr: ['Fort impact'], cons: ['Need simplicity'], cons_fr: ['Besoin de simplicité'] },
];

const TARGET_USERS_AI: OptionItem[] = [
  { value: 'end-users', label: 'End Users (AI features)', label_fr: 'Utilisateurs finaux (IA)', pros: ['Large market', 'High value'], pros_fr: ['Grand marché', 'Haute valeur'], cons: ['Trust issues'], cons_fr: ['Problèmes de confiance'] },
  { value: 'data-scientists', label: 'Data Scientists / ML Engineers', label_fr: 'Data scientists / Ingénieurs ML', pros: ['Technical', 'Self-serve'], pros_fr: ['Techniques', 'Autonomes'], cons: ['Specific needs'], cons_fr: ['Besoins spécifiques'] },
  { value: 'content-creators', label: 'Content Creators', label_fr: 'Créateurs de contenu', pros: ['Growing market', 'High usage'], pros_fr: ['Marché en croissance', 'Usage élevé'], cons: ['Quality expectations'], cons_fr: ['Attentes de qualité'] },
  { value: 'business-analysts', label: 'Business Analysts', label_fr: 'Analystes métier', pros: ['Decision support', 'Budget'], pros_fr: ['Aide à la décision', 'Budget'], cons: ['Non-technical'], cons_fr: ['Non-techniques'] },
  { value: 'developers', label: 'Developers (AI-assisted)', label_fr: 'Développeurs (assistés par l\'IA)', pros: ['High adoption', 'Productivity'], pros_fr: ['Forte adoption', 'Productivité'], cons: ['High expectations'], cons_fr: ['Attentes élevées'] },
];

// ─── Success KPIs ──────────────────────────────────────────────────

const KPIS_WEBSITE: OptionItem[] = [
  { value: 'seo-traffic', label: 'SEO / Organic Traffic', label_fr: 'SEO / Trafic organique', pros: ['Free acquisition', 'Compounding'], pros_fr: ['Acquisition gratuite', 'Effet cumulé'], cons: ['Slow to build'], cons_fr: ['Lent à construire'] },
  { value: 'bounce-rate', label: 'Bounce Rate', label_fr: 'Taux de rebond', pros: ['Engagement signal', 'Easy to track'], pros_fr: ['Signal d\'engagement', 'Facile à suivre'], cons: ['Context-dependent'], cons_fr: ['Dépend du contexte'] },
  { value: 'core-web-vitals', label: 'Core Web Vitals', label_fr: 'Core Web Vitals', pros: ['SEO impact', 'UX quality'], pros_fr: ['Impact SEO', 'Qualité UX'], cons: ['Technical to optimize'], cons_fr: ['Technique à optimiser'] },
  { value: 'conversion', label: 'Conversion Rate', label_fr: 'Taux de conversion', pros: ['Direct business impact'], pros_fr: ['Impact business direct'], cons: ['Hard to attribute'], cons_fr: ['Difficile à attribuer'] },
  { value: 'session-duration', label: 'Session Duration', label_fr: 'Durée de session', pros: ['Content quality signal'], pros_fr: ['Signal de qualité du contenu'], cons: ['Vanity metric risk'], cons_fr: ['Risque de métrique vaniteuse'] },
  { value: 'page-load-time', label: 'Page Load Time', label_fr: 'Temps de chargement', pros: ['Direct UX impact', 'Measurable'], pros_fr: ['Impact UX direct', 'Mesurable'], cons: ['Diminishing returns'], cons_fr: ['Rendements décroissants'] },
];

const KPIS_MOBILE: OptionItem[] = [
  { value: 'app-store-rating', label: 'App Store Rating', label_fr: 'Note sur le store', pros: ['Trust signal', 'Visibility'], pros_fr: ['Signal de confiance', 'Visibilité'], cons: ['Hard to influence'], cons_fr: ['Difficile à influencer'] },
  { value: 'dau-mau', label: 'DAU / MAU', label_fr: 'DAU / MAU', pros: ['Engagement signal', 'Investors love it'], pros_fr: ['Signal d\'engagement', 'Prisé des investisseurs'], cons: ['Vanity metric risk'], cons_fr: ['Risque de métrique vaniteuse'] },
  { value: 'crash-rate', label: 'Crash Rate', label_fr: 'Taux de crash', pros: ['Quality signal', 'Store impact'], pros_fr: ['Signal de qualité', 'Impact store'], cons: ['Hard to set targets'], cons_fr: ['Difficile de fixer des cibles'] },
  { value: 'retention-d7', label: 'Retention (D1/D7/D30)', label_fr: 'Rétention (J1/J7/J30)', pros: ['True engagement', 'Predictive'], pros_fr: ['Engagement réel', 'Prédictif'], cons: ['Slow to measure'], cons_fr: ['Lent à mesurer'] },
  { value: 'session-length', label: 'Session Length', label_fr: 'Durée de session', pros: ['Engagement depth'], pros_fr: ['Profondeur d\'engagement'], cons: ['Depends on app type'], cons_fr: ['Dépend du type d\'app'] },
  { value: 'install-to-signup', label: 'Install-to-Signup Rate', label_fr: 'Taux install→inscription', pros: ['Onboarding quality'], pros_fr: ['Qualité de l\'onboarding'], cons: ['Multiple factors'], cons_fr: ['Facteurs multiples'] },
];

const KPIS_API: OptionItem[] = [
  { value: 'latency', label: 'Latency (p95/p99)', label_fr: 'Latence (p95/p99)', pros: ['Direct UX impact', 'Measurable'], pros_fr: ['Impact UX direct', 'Mesurable'], cons: ['Diminishing returns'], cons_fr: ['Rendements décroissants'] },
  { value: 'uptime', label: 'Uptime / Availability', label_fr: 'Uptime / Disponibilité', pros: ['Trust signal', 'SLA basis'], pros_fr: ['Signal de confiance', 'Base SLA'], cons: ['Costly to improve (99.9→99.99)'], cons_fr: ['Coûteux à améliorer (99.9→99.99)'] },
  { value: 'error-rate', label: 'Error Rate (5xx)', label_fr: 'Taux d\'erreur (5xx)', pros: ['Quality signal', 'Easy to track'], pros_fr: ['Signal de qualité', 'Facile à suivre'], cons: ['Root cause varies'], cons_fr: ['Causes multiples'] },
  { value: 'throughput', label: 'Request Throughput', label_fr: 'Débit de requêtes', pros: ['Scale indicator'], pros_fr: ['Indicateur de scale'], cons: ['Cost implications'], cons_fr: ['Implications coût'] },
  { value: 'api-adoption', label: 'API Adoption Rate', label_fr: 'Taux d\'adoption de l\'API', pros: ['Growth signal'], pros_fr: ['Signal de croissance'], cons: ['Slow to grow'], cons_fr: ['Croissance lente'] },
  { value: 'ttfc', label: 'Time to First Call', label_fr: 'Temps avant le 1er appel', pros: ['DX quality signal'], pros_fr: ['Signal de qualité DX'], cons: ['Hard to measure'], cons_fr: ['Difficile à mesurer'] },
];

const KPIS_SAAS: OptionItem[] = [
  { value: 'mrr-arr', label: 'MRR / ARR', label_fr: 'MRR / ARR', pros: ['Core business metric', 'Investors'], pros_fr: ['Métrique business clé', 'Investisseurs'], cons: ['Lagging indicator'], cons_fr: ['Indicateur retardé'] },
  { value: 'churn', label: 'Churn Rate', label_fr: 'Taux de churn', pros: ['Retention signal', 'Actionable'], pros_fr: ['Signal de rétention', 'Actionnable'], cons: ['Multiple causes'], cons_fr: ['Causes multiples'] },
  { value: 'ltv-cac', label: 'LTV / CAC Ratio', label_fr: 'Ratio LTV / CAC', pros: ['Unit economics', 'Growth efficiency'], pros_fr: ['Économie unitaire', 'Efficacité de croissance'], cons: ['Complex to calculate'], cons_fr: ['Complexe à calculer'] },
  { value: 'feature-adoption', label: 'Feature Adoption', label_fr: 'Adoption des fonctionnalités', pros: ['Product-market fit signal'], pros_fr: ['Signal de product-market fit'], cons: ['Feature-specific'], cons_fr: ['Spécifique aux fonctionnalités'] },
  { value: 'nps', label: 'NPS / CSAT', label_fr: 'NPS / CSAT', pros: ['User satisfaction', 'Predictive'], pros_fr: ['Satisfaction utilisateur', 'Prédictif'], cons: ['Subjective'], cons_fr: ['Subjectif'] },
  { value: 'trial-to-paid', label: 'Trial-to-Paid Conversion', label_fr: 'Conversion essai→payant', pros: ['Onboarding quality', 'Revenue driver'], pros_fr: ['Qualité onboarding', 'Levier de revenus'], cons: ['Multiple factors'], cons_fr: ['Facteurs multiples'] },
];

const KPIS_INFRA: OptionItem[] = [
  { value: 'uptime', label: 'Uptime / Availability', label_fr: 'Uptime / Disponibilité', pros: ['Core reliability metric'], pros_fr: ['Métrique de fiabilité clé'], cons: ['Costly nines'], cons_fr: ['Les 9 coûtent cher'] },
  { value: 'mttr', label: 'MTTR (Mean Time to Recovery)', label_fr: 'MTTR (Temps moyen de recovery)', pros: ['Resilience signal'], pros_fr: ['Signal de résilience'], cons: ['Incident-dependent'], cons_fr: ['Dépend des incidents'] },
  { value: 'deploy-frequency', label: 'Deploy Frequency', label_fr: 'Fréquence de déploiement', pros: ['Velocity signal', 'DORA metric'], pros_fr: ['Signal de vélocité', 'Métrique DORA'], cons: ['Quality trade-off'], cons_fr: ['Compromis qualité'] },
  { value: 'provisioning-time', label: 'Provisioning Time', label_fr: 'Temps de provisionnement', pros: ['DX quality', 'Automation'], pros_fr: ['Qualité DX', 'Automatisation'], cons: ['Hard to benchmark'], cons_fr: ['Difficile à benchmarker'] },
  { value: 'cost-efficiency', label: 'Cost Efficiency', label_fr: 'Efficacité des coûts', pros: ['Budget optimization'], pros_fr: ['Optimisation du budget'], cons: ['Performance trade-off'], cons_fr: ['Compromis performance'] },
  { value: 'incident-count', label: 'Incident Count', label_fr: 'Nombre d\'incidents', pros: ['Easy to track'], pros_fr: ['Facile à suivre'], cons: ['Severity varies'], cons_fr: ['Sévérité variable'] },
];

const KPIS_DATA: OptionItem[] = [
  { value: 'data-freshness', label: 'Data Freshness', label_fr: 'Fraîcheur des données', pros: ['Decision quality', 'Real-time value'], pros_fr: ['Qualité des décisions', 'Valeur temps réel'], cons: ['Cost vs freshness'], cons_fr: ['Coût vs fraîcheur'] },
  { value: 'query-perf', label: 'Query Performance', label_fr: 'Performance des requêtes', pros: ['UX impact', 'Measurable'], pros_fr: ['Impact UX', 'Mesurable'], cons: ['Data volume dependent'], cons_fr: ['Dépend du volume de données'] },
  { value: 'pipeline-reliability', label: 'Pipeline Reliability', label_fr: 'Fiabilité des pipelines', pros: ['Trust signal'], pros_fr: ['Signal de confiance'], cons: ['Complex to measure'], cons_fr: ['Complexe à mesurer'] },
  { value: 'data-quality-score', label: 'Data Quality Score', label_fr: 'Score qualité des données', pros: ['Trustworthy analytics'], pros_fr: ['Analytiques fiables'], cons: ['Subjective definition'], cons_fr: ['Définition subjective'] },
  { value: 'processing-cost', label: 'Processing Cost', label_fr: 'Coût de traitement', pros: ['Budget control'], pros_fr: ['Contrôle du budget'], cons: ['Scale trade-off'], cons_fr: ['Compromis de scale'] },
  { value: 'coverage', label: 'Data Coverage', label_fr: 'Couverture des données', pros: ['Completeness signal'], pros_fr: ['Signal de complétude'], cons: ['Hard to define 100%'], cons_fr: ['Difficile de définir 100%'] },
];

const KPIS_AI: OptionItem[] = [
  { value: 'model-accuracy', label: 'Model Accuracy / F1', label_fr: 'Précision du modèle / F1', pros: ['Core quality metric'], pros_fr: ['Métrique de qualité clé'], cons: ['Task-specific'], cons_fr: ['Spécifique à la tâche'] },
  { value: 'inference-latency', label: 'Inference Latency', label_fr: 'Latence d\'inférence', pros: ['UX impact', 'Measurable'], pros_fr: ['Impact UX', 'Mesurable'], cons: ['Cost trade-off'], cons_fr: ['Compromis coût'] },
  { value: 'training-cost', label: 'Training Cost', label_fr: 'Coût d\'entraînement', pros: ['Budget control'], pros_fr: ['Contrôle du budget'], cons: ['Hard to predict'], cons_fr: ['Difficile à prédire'] },
  { value: 'user-satisfaction', label: 'User Satisfaction with AI', label_fr: 'Satisfaction IA utilisateur', pros: ['Product value signal'], pros_fr: ['Signal de valeur produit'], cons: ['Subjective'], cons_fr: ['Subjectif'] },
  { value: 'hallucination-rate', label: 'Hallucination Rate', label_fr: 'Taux d\'hallucination', pros: ['Safety signal', 'Trust'], pros_fr: ['Signal de sécurité', 'Confiance'], cons: ['Hard to detect'], cons_fr: ['Difficile à détecter'] },
  { value: 'safety-score', label: 'Safety / Guardrail Score', label_fr: 'Score de sécurité / Garde-fous', pros: ['Compliance', 'Trust'], pros_fr: ['Conformité', 'Confiance'], cons: ['Complex to define'], cons_fr: ['Complexe à définir'] },
];

// ─── Primary Goals ─────────────────────────────────────────────────

const GOALS_WEBSITE: OptionItem[] = [
  { value: 'seo-performance', label: 'SEO & Performance', label_fr: 'SEO & Performance', pros: ['Organic growth', 'Free traffic'], pros_fr: ['Croissance organique', 'Trafic gratuit'], cons: ['Slow results'], cons_fr: ['Résultats lents'] },
  { value: 'visual-quality', label: 'Visual Quality', label_fr: 'Qualité visuelle', pros: ['Brand impact', 'Trust'], pros_fr: ['Impact de marque', 'Confiance'], cons: ['Subjective'], cons_fr: ['Subjectif'] },
  { value: 'content-management', label: 'Content Management', label_fr: 'Gestion de contenu', pros: ['Team autonomy', 'Scalable'], pros_fr: ['Autonomie d\'équipe', 'Scalable'], cons: ['CMS complexity'], cons_fr: ['Complexité CMS'] },
  { value: 'accessibility', label: 'Accessibility (a11y)', label_fr: 'Accessibilité (a11y)', pros: ['Inclusive', 'SEO bonus', 'Legal'], pros_fr: ['Inclusif', 'Bonus SEO', 'Légal'], cons: ['Extra effort'], cons_fr: ['Effort supplémentaire'] },
  { value: 'mobile-first', label: 'Mobile-first', label_fr: 'Mobile-first', pros: ['Majority of traffic', 'SEO'], pros_fr: ['Majorité du trafic', 'SEO'], cons: ['Desktop trade-offs'], cons_fr: ['Compromis desktop'] },
  { value: 'time-to-market', label: 'Time to Market', label_fr: 'Délai de mise sur le marché', pros: ['First-mover advantage'], pros_fr: ['Avantage du premier arrivé'], cons: ['Tech debt'], cons_fr: ['Dette technique'] },
];

const GOALS_MOBILE: OptionItem[] = [
  { value: 'performance', label: 'Performance', label_fr: 'Performance', pros: ['UX quality', 'Store ranking'], pros_fr: ['Qualité UX', 'Classement store'], cons: ['Optimization cost'], cons_fr: ['Coût d\'optimisation'] },
  { value: 'offline-support', label: 'Offline Support', label_fr: 'Support hors-ligne', pros: ['Reliability', 'No connectivity need'], pros_fr: ['Fiabilité', 'Pas besoin de connexion'], cons: ['Sync complexity'], cons_fr: ['Complexité de synchronisation'] },
  { value: 'native-ux', label: 'Native UX', label_fr: 'UX native', pros: ['Best user experience', 'Platform feel'], pros_fr: ['Meilleure UX', 'Expérience native'], cons: ['Platform-specific work'], cons_fr: ['Travail spécifique par plateforme'] },
  { value: 'cross-platform', label: 'Cross-platform', label_fr: 'Multi-plateforme', pros: ['One codebase', 'Faster delivery'], pros_fr: ['Une seule codebase', 'Livraison rapide'], cons: ['Performance trade-off'], cons_fr: ['Compromis performance'] },
  { value: 'battery-efficiency', label: 'Battery Efficiency', label_fr: 'Efficacité batterie', pros: ['User satisfaction', 'Compliance'], pros_fr: ['Satisfaction utilisateur', 'Conformité'], cons: ['Limits background work'], cons_fr: ['Limite le travail en arrière-plan'] },
  { value: 'app-size', label: 'App Size Optimization', label_fr: 'Optimisation de la taille', pros: ['Install rate', 'Store compliance'], pros_fr: ['Taux d\'installation', 'Conformité store'], cons: ['Feature trade-offs'], cons_fr: ['Compromis fonctionnalités'] },
];

const GOALS_API: OptionItem[] = [
  { value: 'reliability', label: 'Reliability', label_fr: 'Fiabilité', pros: ['Trust', 'SLA compliance'], pros_fr: ['Confiance', 'Conformité SLA'], cons: ['Slower to ship'], cons_fr: ['Plus lent à livrer'] },
  { value: 'low-latency', label: 'Low Latency', label_fr: 'Faible latence', pros: ['Better DX', 'User experience'], pros_fr: ['Meilleure DX', 'Expérience utilisateur'], cons: ['Infrastructure cost'], cons_fr: ['Coût d\'infrastructure'] },
  { value: 'throughput', label: 'High Throughput', label_fr: 'Haut débit', pros: ['Handles scale'], pros_fr: ['Gère la montée en charge'], cons: ['Cost at scale'], cons_fr: ['Coût à grande échelle'] },
  { value: 'documentation', label: 'Documentation Quality', label_fr: 'Qualité de la documentation', pros: ['Adoption', 'Self-serve'], pros_fr: ['Adoption', 'Autonomie'], cons: ['Maintenance burden'], cons_fr: ['Charge de maintenance'] },
  { value: 'backward-compat', label: 'Backward Compatibility', label_fr: 'Rétrocompatibilité', pros: ['Consumer trust', 'Stability'], pros_fr: ['Confiance consommateur', 'Stabilité'], cons: ['Slows evolution'], cons_fr: ['Ralentit l\'évolution'] },
  { value: 'developer-experience', label: 'Developer Experience', label_fr: 'Expérience développeur', pros: ['Adoption', 'Community'], pros_fr: ['Adoption', 'Communauté'], cons: ['Investment needed'], cons_fr: ['Investissement nécessaire'] },
];

const GOALS_SAAS: OptionItem[] = [
  { value: 'reliability', label: 'Reliability', label_fr: 'Fiabilité', pros: ['User trust', 'Less firefighting'], pros_fr: ['Confiance utilisateur', 'Moins de crises'], cons: ['Slower to ship'], cons_fr: ['Plus lent à livrer'] },
  { value: 'multi-tenancy', label: 'Multi-tenancy', label_fr: 'Multi-tenancy', pros: ['Cost efficient', 'Scalable'], pros_fr: ['Coût efficace', 'Scalable'], cons: ['Isolation complexity'], cons_fr: ['Complexité d\'isolation'] },
  { value: 'scalability', label: 'Scalability', label_fr: 'Scalabilité', pros: ['Handles growth'], pros_fr: ['Gère la croissance'], cons: ['Over-engineering risk'], cons_fr: ['Risque de sur-ingénierie'] },
  { value: 'user-onboarding', label: 'User Onboarding', label_fr: 'Onboarding utilisateur', pros: ['Conversion', 'Retention'], pros_fr: ['Conversion', 'Rétention'], cons: ['Constant iteration'], cons_fr: ['Itération constante'] },
  { value: 'security', label: 'Security & Compliance', label_fr: 'Sécurité & Conformité', pros: ['Enterprise sales', 'Trust'], pros_fr: ['Ventes enterprise', 'Confiance'], cons: ['Slower development'], cons_fr: ['Développement plus lent'] },
  { value: 'feature-velocity', label: 'Feature Velocity', label_fr: 'Vélocité fonctionnelle', pros: ['Competitive edge'], pros_fr: ['Avantage concurrentiel'], cons: ['Tech debt risk'], cons_fr: ['Risque de dette technique'] },
];

const GOALS_INFRA: OptionItem[] = [
  { value: 'automation', label: 'Automation', label_fr: 'Automatisation', pros: ['Consistency', 'Speed'], pros_fr: ['Cohérence', 'Vitesse'], cons: ['Upfront investment'], cons_fr: ['Investissement initial'] },
  { value: 'reproducibility', label: 'Reproducibility', label_fr: 'Reproductibilité', pros: ['Predictable', 'Auditable'], pros_fr: ['Prévisible', 'Auditable'], cons: ['Config complexity'], cons_fr: ['Complexité de configuration'] },
  { value: 'security', label: 'Security', label_fr: 'Sécurité', pros: ['Compliance', 'Trust'], pros_fr: ['Conformité', 'Confiance'], cons: ['Restrictive'], cons_fr: ['Restrictif'] },
  { value: 'cost-optimization', label: 'Cost Optimization', label_fr: 'Optimisation des coûts', pros: ['Budget efficiency'], pros_fr: ['Efficacité budgétaire'], cons: ['Performance trade-off'], cons_fr: ['Compromis performance'] },
  { value: 'observability', label: 'Observability', label_fr: 'Observabilité', pros: ['Incident resolution', 'Proactive'], pros_fr: ['Résolution d\'incidents', 'Proactif'], cons: ['Data volume cost'], cons_fr: ['Coût du volume de données'] },
  { value: 'self-healing', label: 'Self-healing', label_fr: 'Auto-guérison', pros: ['Resilience', 'Less toil'], pros_fr: ['Résilience', 'Moins de travail manuel'], cons: ['Complex to implement'], cons_fr: ['Complexe à implémenter'] },
];

const GOALS_DATA: OptionItem[] = [
  { value: 'data-quality', label: 'Data Quality', label_fr: 'Qualité des données', pros: ['Trust', 'Better decisions'], pros_fr: ['Confiance', 'Meilleures décisions'], cons: ['Ongoing effort'], cons_fr: ['Effort continu'] },
  { value: 'pipeline-reliability', label: 'Pipeline Reliability', label_fr: 'Fiabilité des pipelines', pros: ['Consistent data', 'Trust'], pros_fr: ['Données cohérentes', 'Confiance'], cons: ['Monitoring overhead'], cons_fr: ['Surcharge de monitoring'] },
  { value: 'scalability', label: 'Scalability', label_fr: 'Scalabilité', pros: ['Handles growth'], pros_fr: ['Gère la croissance'], cons: ['Cost at scale'], cons_fr: ['Coût à grande échelle'] },
  { value: 'query-performance', label: 'Query Performance', label_fr: 'Performance des requêtes', pros: ['User satisfaction'], pros_fr: ['Satisfaction utilisateur'], cons: ['Optimization complexity'], cons_fr: ['Complexité d\'optimisation'] },
  { value: 'cost-efficiency', label: 'Cost Efficiency', label_fr: 'Efficacité des coûts', pros: ['Budget control'], pros_fr: ['Contrôle du budget'], cons: ['May limit features'], cons_fr: ['Peut limiter les fonctionnalités'] },
  { value: 'governance', label: 'Data Governance', label_fr: 'Gouvernance des données', pros: ['Compliance', 'Control'], pros_fr: ['Conformité', 'Contrôle'], cons: ['Bureaucracy risk'], cons_fr: ['Risque de bureaucratie'] },
];

const GOALS_AI: OptionItem[] = [
  { value: 'model-accuracy', label: 'Model Accuracy', label_fr: 'Précision du modèle', pros: ['Product value', 'Trust'], pros_fr: ['Valeur produit', 'Confiance'], cons: ['Cost & compute'], cons_fr: ['Coût & calcul'] },
  { value: 'safety', label: 'Safety & Guardrails', label_fr: 'Sécurité & Garde-fous', pros: ['Trust', 'Compliance'], pros_fr: ['Confiance', 'Conformité'], cons: ['Limits creativity'], cons_fr: ['Limite la créativité'] },
  { value: 'inference-speed', label: 'Inference Speed', label_fr: 'Vitesse d\'inférence', pros: ['UX quality', 'Cost'], pros_fr: ['Qualité UX', 'Coût'], cons: ['Accuracy trade-off'], cons_fr: ['Compromis précision'] },
  { value: 'training-efficiency', label: 'Training Efficiency', label_fr: 'Efficacité d\'entraînement', pros: ['Faster iteration', 'Lower cost'], pros_fr: ['Itération rapide', 'Moindre coût'], cons: ['Quality trade-off'], cons_fr: ['Compromis qualité'] },
  { value: 'explainability', label: 'Explainability', label_fr: 'Explicabilité', pros: ['Trust', 'Debugging'], pros_fr: ['Confiance', 'Débogage'], cons: ['Complexity'], cons_fr: ['Complexité'] },
  { value: 'cost-control', label: 'Cost Control (tokens, GPU)', label_fr: 'Contrôle des coûts (tokens, GPU)', pros: ['Budget predictability'], pros_fr: ['Prévisibilité du budget'], cons: ['Limits capabilities'], cons_fr: ['Limite les capacités'] },
];

// ─── Lookup maps ───────────────────────────────────────────────────

const TARGET_USERS_MAP: Partial<Record<ProjectType, OptionItem[]>> = {
  website: TARGET_USERS_WEBSITE,
  mobile: TARGET_USERS_MOBILE,
  api: TARGET_USERS_API,
  saas: TARGET_USERS_SAAS,
  infra: TARGET_USERS_INFRA,
  data: TARGET_USERS_DATA,
  ai: TARGET_USERS_AI,
};

const KPIS_MAP: Partial<Record<ProjectType, OptionItem[]>> = {
  website: KPIS_WEBSITE,
  mobile: KPIS_MOBILE,
  api: KPIS_API,
  saas: KPIS_SAAS,
  infra: KPIS_INFRA,
  data: KPIS_DATA,
  ai: KPIS_AI,
};

const GOALS_MAP: Partial<Record<ProjectType, OptionItem[]>> = {
  website: GOALS_WEBSITE,
  mobile: GOALS_MOBILE,
  api: GOALS_API,
  saas: GOALS_SAAS,
  infra: GOALS_INFRA,
  data: GOALS_DATA,
  ai: GOALS_AI,
};

// ─── Public getters ────────────────────────────────────────────────

export function getTargetUsersOptions(projectType?: string): OptionItem[] {
  return TARGET_USERS_MAP[projectType as ProjectType] ?? TARGET_USERS_OPTIONS;
}

export function getSuccessKpisOptions(projectType?: string): OptionItem[] {
  return KPIS_MAP[projectType as ProjectType] ?? SUCCESS_KPIS_OPTIONS;
}

export function getPrimaryGoalOptions(projectType?: string): OptionItem[] {
  return GOALS_MAP[projectType as ProjectType] ?? PRIMARY_GOAL_OPTIONS;
}

// These are universal enough to stay the same for all project types
export function getPriorityQualitiesOptions(): OptionItem[] {
  return PRIORITY_QUALITIES_OPTIONS;
}

export function getBusinessConstraintsOptions(): OptionItem[] {
  return BUSINESS_CONSTRAINTS_OPTIONS;
}
