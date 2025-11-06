import { createFileRoute } from '@tanstack/react-router'
import LevenshteinPage from '../../pages/tools/LevenshteinPage'

export const Route = createFileRoute('/tools/levenshtein')({
  component: LevenshteinPage,
})
