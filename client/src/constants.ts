import { Braces, Laptop, PencilRuler, UserIcon } from 'lucide-react'

import { Icons } from '@/components/Icons'

export const API_URL = 'http://192.168.0.12:3000'

export const platforms = {
  github: {
    label: 'GitHub',
    domain: 'https://github.com',
    icon: { default: Icons.github.default, solid: Icons.github.solid },
    color: '#000'
  },
  youtube: {
    label: 'YouTube',
    domain: 'https://youtube.com',
    icon: { default: Icons.youtube.default, solid: Icons.youtube.solid },
    color: '#ea1717'
  },
  twitter: {
    label: 'Twitter',
    domain: 'https://twitter.com',
    icon: { default: Icons.twitter.default, solid: Icons.twitter.solid },
    color: '#1da1f2'
  },
  instagram: {
    label: 'Instagram',
    domain: 'https://instagram.com',
    icon: { default: Icons.instagram.default, solid: Icons.instagram.solid },
    color: '#e4405f'
  },
  linkedin: {
    label: 'LinkedIn',
    domain: 'https://linkedin.com',
    icon: { default: Icons.linkedIn.default, solid: Icons.linkedIn.solid },
    color: '#0077b5'
  },
  telegram: {
    label: 'Telegram',
    domain: 'https://t.me',
    icon: { default: Icons.telegram.default, solid: Icons.telegram.solid },
    color: '#0088cc'
  },
  tiktok: {
    label: 'TikTok',
    domain: 'https://tiktok.com',
    icon: { default: Icons.tiktok.default, solid: Icons.tiktok.solid },
    color: '#000'
  },
  vk: {
    label: 'VK',
    domain: 'https://vk.com',
    icon: { default: Icons.vk.default, solid: Icons.vk.solid },
    color: '#45668e'
  }
}

export const colors = [
  '#9878e2',
  '#4c9ece',
  '#b39cd0',
  '#00c9a7',
  '#d5cabd',
  '#adc5cf'
] as const

export const roles = {
  creator: {
    label: 'Content Maker',
    icon: Laptop
  },
  designer: {
    label: 'UI/UX Designer',
    icon: PencilRuler
  },
  dev: {
    label: 'Developer',
    icon: Braces
  },
  user: {
    label: 'User',
    icon: UserIcon
  }
}
