import { PencilIcon, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { Separator } from "../ui/separator";

export default function CountryCard({
  countries,
  handleEditClick,
  deletePending,
  handleDelete,
}) {
  return (
    <>
      {countries.map((country) => (
        <Card size="sm" className="mx-auto w-full" key={country?.id}>
          <div className="flex justify-between">
            <div className="flex items-center gap-3 px-6">
              <div className="bg-gray-100 h-12 w-12 flex items-center justify-center rounded-full">
                {country.abriviation_code}
              </div>
              <div>
                <p className="font-semibold">{country.country_name}</p>
                <span className="text-sm text-muted-foreground">
                  ID: {country.id}
                </span>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-none shadow-none bg-none cursor-pointer pr-6"
                >
                  <TrashIcon className="size-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {`Are you want to remove ${country.country_name} ? This action cannot be undone.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDelete(country?.id);
                    }}
                    disabled={deletePending}
                    className="bg-red-600"
                  >
                    {deletePending ? (
                      <>
                        Deleting... <Spinner />
                      </>
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="px-6">
            <Separator />
          </div>
          <div className="px-6 pt-2 pb-4 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Currency Symbol:{" "}
              <span
                dangerouslySetInnerHTML={{ __html: country.icon }}
                className="text-black"
              />
            </p>
            <span
              onClick={() => handleEditClick(country.id)}
              className="text-brand cursor-pointer"
            >
              <PencilIcon size={16} />
            </span>
          </div>
        </Card>
      ))}
    </>
  );
}
