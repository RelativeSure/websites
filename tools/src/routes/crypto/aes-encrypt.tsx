import { createFileRoute } from '@tanstack/react-router'
import AesEncryptPage from '../../pages/tools/crypto/AesEncryptPage'

export const Route = createFileRoute('/crypto/aes-encrypt')({
  component: AesEncryptPage,
})
