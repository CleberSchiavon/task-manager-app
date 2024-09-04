'use client'
import { Input } from '@nextui-org/react'
import React from 'react'

export default function LoginPage() {
  return (
    <div>
        <p className="text-white">
          Login
        </p>
        <div>
          <Input label="Teste" placeholder="Username" />
        </div>
    </div>
  )
}
