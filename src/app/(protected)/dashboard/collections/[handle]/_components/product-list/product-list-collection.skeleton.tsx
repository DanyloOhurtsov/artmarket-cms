import { Skeleton } from "@/components/ui/skeleton";
import * as TableComponent from "@/components/ui/table";

const ProductListCollectionSkeleton = ({
  isEmpty = false,
}: {
  isEmpty?: boolean;
}) => {
  return (
    <>
      {isEmpty ? (
        <p>пусто</p>
      ) : (
        <>
          <div className="flex flex-col gap-y-4 p-4">
            <div className="flex justify-between items-center">
              <Skeleton className="w-52 h-10" />

              <Skeleton className="w-12 h-10" />
            </div>

            <TableComponent.Table>
              <TableComponent.TableHeader>
                <TableComponent.TableRow className="hover:bg-transparent">
                  <TableComponent.TableHead className="pr-0">
                    <Skeleton className="w-6 h-6" />
                  </TableComponent.TableHead>

                  <TableComponent.TableHead className="w-2">
                    <div className="w-px h-6 bg-primary/20 mx-auto" />
                  </TableComponent.TableHead>

                  <TableComponent.TableHead className="pl-0">
                    <div className="pl-10">
                      <Skeleton className="w-24 h-6" />
                    </div>
                  </TableComponent.TableHead>

                  <TableComponent.TableHead>
                    <Skeleton className="w-24 h-6" />
                  </TableComponent.TableHead>

                  <TableComponent.TableHead>
                    <Skeleton className="w-24 h-6" />
                  </TableComponent.TableHead>
                </TableComponent.TableRow>
              </TableComponent.TableHeader>

              <TableComponent.TableBody>
                {Array(5)
                  .fill("")
                  .map((_, idx) => (
                    <TableComponent.TableRow key={idx}>
                      <TableComponent.TableHead className="pr-0">
                        <Skeleton className="w-6 h-6" />
                      </TableComponent.TableHead>

                      <TableComponent.TableHead className="w-2">
                        <div className="w-px h-6 bg-primary/20 mx-auto" />
                      </TableComponent.TableHead>

                      <TableComponent.TableHead className="pl-0">
                        <div className="pl-10">
                          <Skeleton className="w-24 h-6" />
                        </div>
                      </TableComponent.TableHead>

                      <TableComponent.TableHead>
                        <Skeleton className="w-24 h-6" />
                      </TableComponent.TableHead>

                      <TableComponent.TableHead>
                        <Skeleton className="w-24 h-6" />
                      </TableComponent.TableHead>
                    </TableComponent.TableRow>
                  ))}
              </TableComponent.TableBody>
            </TableComponent.Table>
          </div>
        </>
      )}
    </>
  );
};

export default ProductListCollectionSkeleton;
