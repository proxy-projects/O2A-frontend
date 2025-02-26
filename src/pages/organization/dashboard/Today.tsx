import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTodaySubmissions } from "../../../api/api";
import { Box, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { ErrorDisplay } from "../../../components/ui/ErrorDisplay/ErrorDisplay";

interface FormField {
  id: string;
  label: string;
  value: string;
}

interface Submission {
  id: string;
  form_data: FormField[];
  submission_id: string;
  created_at: string;
}

function Today() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState<any[]>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const filtered = rows
      .filter((row) => {
        return Object.keys(row).some((field) => {
          const value = row[field]?.toString().toLowerCase();
          return value?.includes(searchText.toLowerCase());
        });
      })
      .map((row, index) => ({
        ...row,
        index: index + 1,
      }));
    setFilteredRows(filtered);
  }, [searchText, rows]);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        if (!id) {
          setError("Organization ID is missing");
          setLoading(false);
          return;
        }

        const { data, error } = await fetchTodaySubmissions(id!);
        if (error) throw error;
        setSubmissions(data || []);

        // Generate columns from the first submission
        if (data && data.length > 0) {
          const baseColumns: GridColDef[] = [
            {
              field: "index",
              headerName: "No.",
              width: 100,
              sortable: false,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "submission_id",
              headerName: "Reference ID",
              width: 180,
              flex: 1,
              sortable: true,
            },
            {
              field: "created_at",
              headerName: "Time",
              width: 180,
              flex: 1,
              sortable: true,
              valueFormatter: (params) => {
                const date = new Date(params);
                return date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });
              },
            },
          ];

          // Add dynamic columns based on form_data
          const formDataColumns: GridColDef[] = data[0].form_data.map(
            (field: FormField) => ({
              field: `field_${field.id}`,
              headerName: field.label,
              width: 150,
              flex: 1,
              sortable: true,
            })
          );

          setColumns([...baseColumns, ...formDataColumns]);

          // Transform submissions into rows
          const transformedRows = data.map((submission, index) => {
            const baseRow: {
              id: string;
              index: number;
              submission_id: string;
              created_at: string;
              [key: `field_${string}`]: string;
            } = {
              id: submission.id,
              index: index + 1,
              submission_id: submission.submission_id,
              created_at: submission.created_at,
            };

            submission.form_data.forEach((field: FormField) => {
              baseRow[`field_${field.id}`] = field.value;
            });

            return baseRow;
          });

          setRows(transformedRows);
        }
      } catch (error) {
        setError("Failed to load submissions");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadSubmissions();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorDisplay message={error} severity="error" />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Today's List
      </Typography>

      {submissions.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No Registrations found for today
        </Typography>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 1,
            }}
          >
            <TextField
              variant="outlined"
              label="search"
              placeholder="Search across all fields"
              sx={{
                mb: 2,
                width: "300px",
              }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Box>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            density="comfortable"
            hideFooter={true}
            disableRowSelectionOnClick={true}
            disableColumnSelector={true}
            isRowSelectable={() => false}
            rowSelection={false}
            localeText={{
              noRowsLabel: "No matching records found",
            }}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                color: "black",
                fontSize: "16px",
                fontWeight: "bold",
                minHeight: "60px",
                fontFamily: "Arial",
                textTransform: "uppercase",
              },
              "& .MuiDataGrid-columnHeader": {
                padding: "0px 8px",
                backgroundColor: "#1976d2",
                color: "white",
                "&:hover": {
                  color: "white",
                },
              },
              "& .MuiDataGrid-cell": {
                borderRight: "1px solid #e0e0e0",
                borderBottom: "1px solid #e0e0e0",
              },
              "& .MuiDataGrid-cell:last-child": {
                borderRight: "none",
              },
              "& .MuiDataGrid-columnHeader:last-child": {
                borderRight: "none",
              },
              border: "1px solid #e0e0e0",

              "& .MuiDataGrid-row:": {
                backgroundColor: "action.hover",
              },

              "& .MuiDataGrid-iconButtonContainer > .MuiButtonBase-root": {
                visibility: "visible !important",
                width: "auto",
                opacity: 1,
              },
              "& .MuiDataGrid-sortIcon": {
                opacity: 1,
                color: "white",
                visibility: "visible !important",
              },
              "& .MuiDataGrid-menuIcon": {
                opacity: 1,
                color: "white",
                visibility: "visible !important",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              // Add these additional selectors
              "& .MuiDataGrid-columnHeader .MuiIconButton-root": {
                visibility: "visible",
                opacity: 1,
                color: "white",
              },
              "& .MuiDataGrid-columnHeader:hover .MuiIconButton-root": {
                visibility: "visible",
                opacity: 1,
                color: "white",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default Today;
