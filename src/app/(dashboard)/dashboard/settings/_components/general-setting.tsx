"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function GeneralSetting() {
  const [displayName, setDisplayName] = useState('Yogendra Rana')
  const [username, setUsername] = useState('yogendrarana')
  const [email, setEmail] = useState('yogendrarana.tech@gmail.com')

  return (
    <div className="space-y-3">
      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-medium'>Avatar</CardTitle>
          <CardDescription>This is your avatar.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p>Click on the avatar to upload a custom one from your files.</p>
            <p className="text-sm text-muted-foreground mt-2">An avatar is optional but strongly recommended.</p>
          </div>
          <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-yellow-600">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
            </svg>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-medium'>Display Name</CardTitle>
          <CardDescription>Please enter your full name, or a display name you are comfortable with.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input 
            value={displayName} 
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={32}
          />
          <p className="text-sm text-muted-foreground mt-2">Please use 32 characters at maximum.</p>
        </CardContent>
        <CardFooter>
          <Button>Save</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-medium'>Username</CardTitle>
          <CardDescription>This is your URL namespace within Vercel.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
              vercel.com/
            </span>
            <Input 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              maxLength={48}
              className="rounded-l-none"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">Please use 48 characters at maximum.</p>
        </CardContent>
        <CardFooter>
          <Button>Save</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-medium'>Email</CardTitle>
          <CardDescription>Enter the email addresses you want to use to log in with Vercel. Your primary email will be used for account-related notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Verified</span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Primary</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Emails must be verified to be able to login with them or be used as primary email.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Add Another</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-medium'>Delete Account</CardTitle>
          <CardDescription>Permanently remove your Personal Account and all of its contents from the Vercel platform. This action is not reversible, so please continue with caution.</CardDescription>
        </CardHeader>
        <CardFooter className='p-3 bg-red-50 flex items-center justify-end'>
            <Button variant="destructive" className='place-self-center'>Delete Personal Account</Button>
        </CardFooter>
      </Card>
    </div>
  )
}