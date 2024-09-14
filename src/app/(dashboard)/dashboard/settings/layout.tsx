import React from 'react'
import SettingNav from './_components/setting-nav'

interface SettingNavProps {
  children: React.ReactNode
}

const SettingsPage = ({ children }: SettingNavProps) => {
  return (
    <div className='min-h-full'>
      <SettingNav />

      <div className='mt-3'>{children}</div>
    </div>
  )
}

export default SettingsPage