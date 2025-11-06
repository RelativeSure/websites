import { createFileRoute } from '@tanstack/react-router'
import LevenshteinPage from '../../../pages/tools/text-tools/LevenshteinPage'

export const Route = createFileRoute('/_tools/text-tools/levenshtein')({
  component: LevenshteinPage,
})
