"use client";

import { useState } from "react";
import { useForm } from "react-hook-form"; // Add this import
import { AlertCircle, Download, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/Card/Card";
import { Textarea } from "../../../components/ui/TextArea/TextArea";
import Input from "../../../components/ui/Input/Input";
import { Label } from "../../../components/ui/Label/Label";
import Button from "../../../components/ui/Button/Button";

// Define your form data type
interface FormData {
  orgName: string;
  orgId: string;
  orgOwner: string;
  description: string;
}

export default function Profile() {
  const [isEdited, setIsEdited] = useState(false);

  // Initialize react-hook-form
  const { control } = useForm<FormData>({
    defaultValues: {
      orgName: "Acme Corporation",
      orgId: "ACM123456",
      orgOwner: "john.doe@acme.com",
      description:
        "Leading provider of innovative solutions for businesses worldwide.",
    },
  });

  // Placeholder data
  const orgData = {
    name: "Acme Corporation",
    id: "ACM123456",
    owner: "john.doe@acme.com",
    description:
      "Leading provider of innovative solutions for businesses worldwide.",
    logo: "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Organization Profile</h1>
      <p className="text-muted-foreground mb-6">
        View and manage your organization's profile details.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organization Details</CardTitle>
            <CardDescription>
              Update your organization's information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input
                name="orgName"
                control={control}
                defaultValue={orgData.name}
                onChange={() => setIsEdited(true)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-id">Organization ID</Label>
              <Input
                name="orgId"
                control={control}
                defaultValue={orgData.id}
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-owner">Organization Owner</Label>
              <Input
                name="orgOwner"
                control={control}
                type="email"
                defaultValue={orgData.owner}
                onChange={() => setIsEdited(true)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-description">Description</Label>
              <Textarea
                id="org-description"
                defaultValue={orgData.description}
                onChange={() => setIsEdited(true)}
              />
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <Button className="bg-gray-200">Cancel</Button>
              <Button className="bg-gray-200" disabled={!isEdited}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Logo</CardTitle>
              <CardDescription>
                Upload or change your organization's logo
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-muted">
                <img
                  src={orgData.logo || "/placeholder.svg"}
                  alt="Organization Logo"
                  className="object-cover"
                />
              </div>
              <Button className="hover:bg-gray-100 transition-all ease-in-out">
                <Upload className="mr-2 h-4 w-4" /> Upload New Logo
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>QR Code</CardTitle>
              <CardDescription>
                This QR code links users directly to your organization's form.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 bg-muted flex items-center justify-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground" />
              </div>
              <Button className="hover:bg-gray-100 transition-all ease-in-out">
                <Download className="mr-2 h-4 w-4" /> Download QR Code
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
