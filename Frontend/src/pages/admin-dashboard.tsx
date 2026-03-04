import { Layout } from "@/components/layout";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Plus, Edit, Trash, LogOut } from "lucide-react";
import { getAllCities, type City } from "@/lib/api/cities";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { user, logout, token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    priceStart: "",
    image: "",
    rating: "",
    reviews: "",
    features: ""
  });

  const { data: cities, isLoading } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: getAllCities,
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => {
      return fetch("/api/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }).then(res => {
        if (!res.ok) throw new Error("Failed to create city");
        return res.json();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      resetForm();
      toast({ title: "City created successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create city", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      return fetch(`/api/cities/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }).then(res => {
        if (!res.ok) throw new Error("Failed to update city");
        return res.json();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      resetForm();
      toast({ title: "City updated successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update city", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return fetch(`/api/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(res => {
        if (!res.ok) throw new Error("Failed to delete city");
        return res.json();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      toast({ title: "City deleted successfully!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete city", variant: "destructive" });
    }
  });

  const resetForm = () => {
    setFormData({
      name: "",
      country: "",
      description: "",
      priceStart: "",
      image: "",
      rating: "",
      reviews: "",
      features: ""
    });
    setIsEditing(false);
    setEditingCity(null);
  };

  const handleEdit = (city: City) => {
    setIsEditing(true);
    setEditingCity(city);
    setFormData({
      name: city.name,
      country: city.country,
      description: city.description,
      priceStart: city.priceStart.toString(),
      image: city.image,
      rating: city.rating.toString(),
      reviews: city.reviews.toString(),
      features: city.features.join(", ")
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cityData = {
      name: formData.name,
      country: formData.country,
      description: formData.description,
      priceStart: Number(formData.priceStart),
      image: formData.image,
      rating: formData.rating ? Number(formData.rating) : 0,
      reviews: formData.reviews ? Number(formData.reviews) : 0,
      features: formData.features.split(",").map(f => f.trim()).filter(f => f)
    };

    if (isEditing && editingCity) {
      updateMutation.mutate({ id: editingCity._id, data: cityData });
    } else {
      createMutation.mutate(cityData);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome, {user?.name}</p>
            </div>
            <Button onClick={logout} variant="outline" className="gap-2 cursor-pointer">
              <LogOut size={18} />
              Logout
            </Button>
          </div>

          {/* Form Card */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              {isEditing ? <Edit size={24} /> : <Plus size={24} />}
              {isEditing ? "Edit City" : "Add New City"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="City Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                placeholder="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
              <Input
                placeholder="Price (PKR)"
                type="number"
                value={formData.priceStart}
                onChange={(e) => setFormData({ ...formData, priceStart: e.target.value })}
                required
              />
              <Input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
              <Input
                placeholder="Rating (0-5)"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              />
              <Input
                placeholder="Number of Reviews"
                type="number"
                value={formData.reviews}
                onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-full"
                required
              />
              <Input
                placeholder="Features (comma separated)"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="col-span-full"
              />

              <div className="col-span-full flex gap-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {isEditing ? "Update City" : "Create City"}
                </Button>
                {isEditing && (
                  <Button type="button" variant="outline" onClick={resetForm} className="cursor-pointer">
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Cities List */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Cities</h2>

            {isLoading ? (
              <div className="text-center py-12">Loading cities...</div>
            ) : (
              <div className="grid gap-4">
                {cities?.map((city) => (
                  <Card key={city._id} className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">{city.name}, {city.country}</h3>
                        <p className="text-gray-600 text-sm mt-1">{city.description}</p>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span className="font-semibold text-blue-600">PKR {city.priceStart.toLocaleString()}</span>
                          <span>⭐ {city.rating}</span>
                          <span>{city.reviews} reviews</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          {city.features.join(" • ")}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" onClick={() => handleEdit(city)} className="gap-2 cursor-pointer">
                          <Edit size={16} />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteMutation.mutate(city._id)}
                          disabled={deleteMutation.isPending}
                          className="gap-2"
                        >
                          <Trash size={16} />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
