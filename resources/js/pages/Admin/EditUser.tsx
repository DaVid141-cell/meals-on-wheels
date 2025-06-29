import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import Map from '@/components/Map';
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function EditUser({ user }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        first_name: user.userable.first_name,
        last_name: user.userable.last_name,
        org_name: user.userable.org_name,
        location_lat: user.location_lat,
        location_lng: user.location_lng,
    });

    function submit(e) {
        e.preventDefault();
        patch(route('admin.users.update', user.id), {
            onSuccess: () => toast.success("User has been updated"),
        });
    }

    function getLocation(lat, lng) {
        setData('location_lat', lat);
        setData('location_lng', lng);
    }

    return (
        <AdminLayout>
            <Head title="Edit User" />
            <div className="mb-2">Edit User</div>
            <form className="border p-4 rounded-xl w-fit" onSubmit={submit}>
                <Toaster position="top-center" richColors/>
                {user.userable_type !== 'kitchen partner' ?
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                id="first_name"
                                onChange={e => setData('first_name', e.target.value)}
                                type="text"
                                value={data.first_name}
                            />
                            <InputError message={errors.first_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                id="last_name"
                                onChange={e => setData('last_name', e.target.value)}
                                type="text"
                                value={data.last_name}
                            />
                            <InputError message={errors.last_name} />
                        </div>
                    </div>
                    :
                    <div>
                        <Label>Organization Name</Label>
                        <Input
                            id="org_name"
                            onChange={e => setData('org_name', e.target.value)}
                            type="text"
                            value={data.org_name}
                        />
                        <InputError message={errors.org_name} />
                    </div>
                }
                <div className='w-100'>
                    <Label className="mt-4">Location</Label>
                    <Map markAt={{ lat: data.location_lat, lng: data.location_lng }} sendLocation={getLocation} />
                </div>
                <div className="flex gap-3 justify-end mt-4">
                    <Button asChild variant="outline">
                        <Link href={route('admin.users.index')}>
                            Cancel
                        </Link>
                    </Button>
                    <Button
                        disabled={processing}
                        type="submit"
                    >
                        Update
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
