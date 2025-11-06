import { createFileRoute } from '@tanstack/react-router'
import AesEncryptPage from '../../pages/tools/AesEncryptPage'

export const Route = createFileRoute('/tools/aes-encrypt')({
  component: AesEncryptPage,
})
