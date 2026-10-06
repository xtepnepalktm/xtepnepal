import { usePopover } from "minimal-shared/hooks";

import {
  Box,
  Button,
  Tooltip,
  MenuList,
  MenuItem,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { RouterLink } from "@/routes/components";

import { Iconify } from "@/components/iconify";
import { CustomPopover } from "@/components/custom-popover";

// ----------------------------------------------------------------------

export function ProductDetailsToolbar({
  sx,
  publish,
  backHref,
  editHref,
  liveHref,
  publishOptions,
  onChangePublish,
  ...other
}) {
  const menuActions = usePopover();

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: "top-right" } }}
    >
      <MenuList>
        {publishOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === publish}
            onClick={() => {
              menuActions.onClose();
              onChangePublish(option.value);
            }}
          >
            {option.value === "published" && (
              <Iconify icon="eva:cloud-upload-fill" />
            )}
            {option.value === "draft" && (
              <Iconify icon="solar:file-text-bold" />
            )}
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Box
        sx={[
          { gap: 1.5, display: "flex", mb: { xs: 3, md: 5 } },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Button
          component={RouterLink}
          href={"/"}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Back
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        {publish === "published" && (
          <Tooltip title="Go Live">
            <IconButton component={RouterLink} href={"/"}>
              <Iconify icon="eva:external-link-fill" />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Edit">
          <IconButton component={RouterLink} href={"/"}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>

        <LoadingButton
          color="inherit"
          variant="contained"
          loading={!publish}
          loadingIndicator="Loading…"
          endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
          onClick={menuActions.onOpen}
          sx={{ textTransform: "capitalize" }}
        >
          {publish}
        </LoadingButton>
      </Box>

      {renderMenuActions()}
    </>
  );
}
