"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpPage() {
  const [userType, setUserType] = useState("donor")

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/book%20now%20%E2%86%92%20(4)-0fmc9LeYaD4TJMS24YD2Ma39v78hng.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <Card className="w-full max-w-md relative z-10">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Join Bloodlink to start saving lives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>I am a</Label>
            <RadioGroup defaultValue="donor" onValueChange={setUserType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="donor" id="donor" />
                <Label htmlFor="donor">Donor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hospital" id="hospital" />
                <Label htmlFor="hospital">Hospital</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>

          {userType === "donor" && (
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <select id="bloodType" className="w-full p-2 border rounded-md">
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          )}

          {userType === "hospital" && (
            <div className="space-y-2">
              <Label htmlFor="hospitalId">Hospital Registration ID</Label>
              <Input id="hospitalId" placeholder="Enter hospital registration number" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-blood-600 hover:bg-blood-700">Create Account</Button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blood-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

