/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/skillcash-platform' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/skillcash-platform/' : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Pre-generate all static pages
  generateStaticParams: async () => {
    return []
  },
  // Ensure all dynamic routes are handled
  exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/pricing': { page: '/pricing' },
      '/help': { page: '/help' },
      '/contact': { page: '/contact' },
      '/creator-guide': { page: '/creator-guide' },
      '/api-docs': { page: '/api-docs' },
      '/privacy': { page: '/privacy' },
      '/terms': { page: '/terms' },
      '/cookies': { page: '/cookies' },
      '/creator-login': { page: '/creator-login' },
      '/creator-signup': { page: '/creator-signup' },
      '/dashboard': { page: '/dashboard' },
      '/dashboard/settings': { page: '/dashboard/settings' },
      '/dashboard/products/add': { page: '/dashboard/products/add' },
      '/dashboard/sales': { page: '/dashboard/sales' },
      '/dashboard/messages': { page: '/dashboard/messages' },
      '/dashboard/analytics': { page: '/dashboard/analytics' },
      '/admin': { page: '/admin' },
      '/admin/settings': { page: '/admin/settings' },
      '/admin/security': { page: '/admin/security' },
      '/admin/users': { page: '/admin/users' },
      '/admin/products': { page: '/admin/products' },
      '/admin/messages': { page: '/admin/messages' },
      '/admin/reports': { page: '/admin/reports' },
      '/admin/banners': { page: '/admin/banners' },
      '/wizard/income-assessment': { page: '/wizard/income-assessment' },
      '/wizard/role-selection': { page: '/wizard/role-selection' },
      '/wizard/skills-assessment': { page: '/wizard/skills-assessment' },
      '/wizard/product-recommendations': { page: '/wizard/product-recommendations' },
      '/wizard/store-setup': { page: '/wizard/store-setup' },
      '/wizard/complete': { page: '/wizard/complete' },
      // Pre-generate known store pages
      '/store/ravi-hr-hub': { page: '/store/[storeId]', query: { storeId: 'ravi-hr-hub' } },
      '/store/demo-store': { page: '/store/[storeId]', query: { storeId: 'demo-store' } },
      // Pre-generate known product pages
      '/purchase/hr-policy-library': { page: '/purchase/[productId]', query: { productId: 'hr-policy-library' } },
      '/purchase/onboarding-masterclass': { page: '/purchase/[productId]', query: { productId: 'onboarding-masterclass' } },
      '/purchase/performance-management-guide': { page: '/purchase/[productId]', query: { productId: 'performance-management-guide' } },
      '/purchase/employee-handbook': { page: '/purchase/[productId]', query: { productId: 'employee-handbook' } },
      '/purchase/performance-review-system': { page: '/purchase/[productId]', query: { productId: 'performance-review-system' } },
      '/purchase/recruitment-toolkit': { page: '/purchase/[productId]', query: { productId: 'recruitment-toolkit' } },
      // Success pages
      '/purchase/hr-policy-library/success': { page: '/purchase/[productId]/success', query: { productId: 'hr-policy-library' } },
      '/purchase/onboarding-masterclass/success': { page: '/purchase/[productId]/success', query: { productId: 'onboarding-masterclass' } },
      '/purchase/performance-management-guide/success': { page: '/purchase/[productId]/success', query: { productId: 'performance-management-guide' } },
      '/purchase/employee-handbook/success': { page: '/purchase/[productId]/success', query: { productId: 'employee-handbook' } },
      '/purchase/performance-review-system/success': { page: '/purchase/[productId]/success', query: { productId: 'performance-review-system' } },
      '/purchase/recruitment-toolkit/success': { page: '/purchase/[productId]/success', query: { productId: 'recruitment-toolkit' } },
    }
  }
}

export default nextConfig
