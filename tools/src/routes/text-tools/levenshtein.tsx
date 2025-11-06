import { createFileRoute } from '@tanstack/react-router'
import LevenshteinPage from '../../pages/tools/text-tools/LevenshteinPage'

export const Route = createFileRoute('/text-tools/levenshtein')({
  component: LevenshteinPage,
})
