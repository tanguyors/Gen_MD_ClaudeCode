export interface TechSuggestions {
  languages?: string;
  backendFramework?: string;
  frontendFramework?: string;
  packageManager?: string;
  hosting?: string;
  orm?: string;
  authTools?: string;
  database?: string;
}

export interface TechDependencyRule {
  field: string;
  value: string;
  suggests: TechSuggestions;
}

export const TECH_DEPENDENCIES: TechDependencyRule[] = [
  // Frontend framework rules
  {
    field: 'frontendFramework',
    value: 'nextjs',
    suggests: {
      languages: 'TypeScript',
      backendFramework: 'nextjs-api',
      packageManager: 'pnpm',
      hosting: 'vercel',
    },
  },
  {
    field: 'frontendFramework',
    value: 'react-vite',
    suggests: {
      languages: 'TypeScript',
      packageManager: 'pnpm',
    },
  },
  {
    field: 'frontendFramework',
    value: 'vue',
    suggests: {
      languages: 'TypeScript',
      packageManager: 'pnpm',
    },
  },
  {
    field: 'frontendFramework',
    value: 'nuxt',
    suggests: {
      languages: 'TypeScript',
      packageManager: 'pnpm',
    },
  },
  {
    field: 'frontendFramework',
    value: 'svelte',
    suggests: {
      languages: 'TypeScript',
      packageManager: 'pnpm',
    },
  },
  {
    field: 'frontendFramework',
    value: 'angular',
    suggests: {
      languages: 'TypeScript',
      packageManager: 'npm',
    },
  },
  {
    field: 'frontendFramework',
    value: 'remix',
    suggests: {
      languages: 'TypeScript',
      backendFramework: 'remix',
      packageManager: 'pnpm',
    },
  },

  // Backend framework rules
  {
    field: 'backendFramework',
    value: 'django',
    suggests: {
      languages: 'Python',
      packageManager: 'pip',
      orm: 'sqlalchemy',
    },
  },
  {
    field: 'backendFramework',
    value: 'fastapi',
    suggests: {
      languages: 'Python',
      packageManager: 'pip',
      orm: 'sqlalchemy',
    },
  },
  {
    field: 'backendFramework',
    value: 'rails',
    suggests: {
      languages: 'Ruby',
      packageManager: 'bundler',
    },
  },
  {
    field: 'backendFramework',
    value: 'spring',
    suggests: {
      languages: 'Java',
      packageManager: 'maven',
    },
  },
  {
    field: 'backendFramework',
    value: 'express',
    suggests: {
      languages: 'TypeScript',
      packageManager: 'pnpm',
    },
  },
  {
    field: 'backendFramework',
    value: 'fastify',
    suggests: {
      languages: 'TypeScript',
      packageManager: 'pnpm',
    },
  },
  {
    field: 'backendFramework',
    value: 'nestjs',
    suggests: {
      languages: 'TypeScript',
      packageManager: 'pnpm',
    },
  },
  {
    field: 'backendFramework',
    value: 'hono',
    suggests: {
      languages: 'TypeScript',
      packageManager: 'pnpm',
    },
  },
  {
    field: 'backendFramework',
    value: 'go-stdlib',
    suggests: {
      languages: 'Go',
      packageManager: 'go-modules',
    },
  },

  // Database rules
  {
    field: 'database',
    value: 'supabase',
    suggests: {
      authTools: 'supabase-auth',
      hosting: 'vercel',
    },
  },
  {
    field: 'database',
    value: 'firestore',
    suggests: {
      authTools: 'firebase-auth',
    },
  },
  {
    field: 'database',
    value: 'postgresql',
    suggests: {
      orm: 'prisma',
    },
  },
];

/**
 * Given a field change, returns suggested values for other fields.
 * Only suggests if the target field is currently empty.
 */
export function getSuggestions(
  changedField: string,
  changedValue: string,
  currentValues: Record<string, string>
): TechSuggestions {
  const suggestions: TechSuggestions = {};

  for (const rule of TECH_DEPENDENCIES) {
    if (rule.field === changedField && rule.value === changedValue) {
      for (const [key, value] of Object.entries(rule.suggests)) {
        // Only suggest if field is empty
        if (!currentValues[key]) {
          (suggestions as Record<string, string>)[key] = value;
        }
      }
    }
  }

  return suggestions;
}
