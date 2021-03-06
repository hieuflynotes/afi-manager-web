import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import TextField from "../../component/common/TextFiled";
import Button from "../../component/common/Button";
import ListGrid from "../../component/common/ListGrid";
import { useGlobalStyles } from "../../theme/GlobalStyle";
import { useCrudHook } from "../../hook/useCrudHook";
import { Pagination } from "@material-ui/lab";
import PopUpConfirm from "../../component/common/PopupConfirm";
import { useHistory } from "react-router-dom";
import { UserHm } from "src/afi-manager-base-model/model/UserHm";
import { orderTrackingController, userHmController } from "src/controller";
import UserHmItemList from "src/component/AutoOrderHm/UserHmItemList";
import PopupInsertUser from "src/component/AutoOrderHm/PopupInsertUser";
import theme from "src/theme/MuiTheme";
import { handleWithPopupHook } from "src/hook/HandleWithPopupHook";
import PopupMergeToUser from "src/component/AutoOrderHm/PopupMergeToUser";
import { OrderTracking } from "src/afi-manager-base-model/model/OrderTracking";
import SelectBox from "src/component/common/SelectBox";

type Props = {};
const useStyle = makeStyles((theme) => ({}));
function UserHmManager(props: Props) {
    const history = useHistory();
    const handleWithPopupMerge = handleWithPopupHook<{
        userHmId?: string;
        userId?: string;
    }>({
        onConfirmByPopup: (item) => {
            orderTrackingController.mergeOrderTrackingToUser({
                ...item,
                userHmId: item?.userHmId || (null as any),
            });
        },
    });
    const crudCompany = useCrudHook<UserHm>({
        controller: userHmController,
        initQuery: {
            pageSize: 50,
        },
    });
    const classes = useStyle();
    const globalStyle = useGlobalStyles();
    const [state, setState] = useState();
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <Grid
            container
            style={{
                minHeight: "100vh",
                background: "white",
                padding: theme.spacing(2),
            }}
        >
            <Grid container justify="center" className={clsx(globalStyle.pp2)}>
                <PopUpConfirm
                    isDisplay={crudCompany.isShowConfirm}
                    onCancel={crudCompany.onCancelConfirm}
                    onConfirm={() =>
                        crudCompany.onDelete(crudCompany.itemSelected)
                    }
                />

                <PopupMergeToUser
                    isDisplay={handleWithPopupMerge.isDisplayPopup}
                    item={handleWithPopupMerge.itemSelected}
                    onCancel={handleWithPopupMerge.handleClosePopup}
                    onEdit={handleWithPopupMerge.handleConfirmByPopup}
                />

                <PopupInsertUser
                    isDisplay={crudCompany.isShowPopup}
                    item={crudCompany.itemSelected}
                    onCancel={crudCompany.onCancelPopup}
                    onEdit={crudCompany.onSave}
                />
                <Grid md={10}>
                    <Grid container justify="center">
                        <Typography align="center" variant="h4">
                            Danh s??ch ????n h??ng
                        </Typography>
                    </Grid>
                    <Grid container justify="space-between">
                        {/* <TextField
                            onChange={(e) =>
                                crudCompany.onQueryChanged(e.target.value)
                            }
                            className={clsx(globalStyle.mt2, globalStyle.mb2)}
                            label="search"
                            variant="outlined"
                        ></TextField> */}
                        <SelectBox
                            data={[
                                "T???t c???",
                                "???? xong",
                                "Ch??a xong",
                                "???? merge",
                                "Ch??a merge",
                            ]}
                            labelOption={(op) => op}
                            variant="outlined"
                            label="Filter"
                            fullWidth
                            // inputLabelProps={{
                            //     shrink: true,
                            // }}
                            valueOption={(value) => value}
                            onChange={(e: any) => {
                                switch (e) {
                                    case "???? xong":
                                        crudCompany.setFilter({
                                            isDone: true,
                                        });
                                        break;
                                    case "Ch??a xong":
                                        crudCompany.setFilter({
                                            isDone: [false, null as any],
                                        });
                                        break;
                                    case "???? merge":
                                        crudCompany.setFilter({
                                            isMerge: true,
                                        });
                                        break;
                                    case "Ch??a merge":
                                        crudCompany.setFilter({
                                            isMerge: [false, null as any],
                                        });
                                        break;
                                    default:
                                        crudCompany.setFilter({});
                                        break;
                                }
                            }}
                        />
                        <TextField
                            style={{ marginTop: 24 }}
                            fullWidth
                            variant="outlined"
                            placeholder="Search by username and note"
                            value={crudCompany.query?.search}
                            onChange={(e) => {
                                crudCompany.setQuery({
                                    search: e.target.value.trim(),
                                    searchFields: ["note", "username"],
                                });
                            }}
                        ></TextField>
                        <Button
                            className={clsx(globalStyle.mt2, globalStyle.mb2)}
                            variant="contained"
                            color="primary"
                            onClick={() => crudCompany.onShowPopup({})}
                        >
                            T???o ????n
                        </Button>
                    </Grid>
                    <Grid
                        container
                        // justify="center"
                        className={clsx(globalStyle.pt2, globalStyle.pb2)}
                    >
                        <ListGrid minWidthItem={"300px"} gridGap={20}>
                            {crudCompany.pagingList?.rows?.map((item) => (
                                <Grid>
                                    <UserHmItemList
                                        item={item}
                                        onMergeUser={(item) => {
                                            handleWithPopupMerge.handleShowPopup(
                                                {
                                                    userHmId: item.id,
                                                }
                                            );
                                        }}
                                        onDelete={crudCompany.onConfirm}
                                        onEdit={crudCompany.onShowPopup}
                                        onSeeDetail={(item) => {
                                            history.push(
                                                `/progress-order/${item.id}`
                                            );
                                        }}
                                    />
                                </Grid>
                            ))}
                        </ListGrid>
                    </Grid>
                    <Grid
                        container
                        className={clsx(globalStyle.pt2, globalStyle.pb2)}
                    >
                        <Pagination
                            count={crudCompany.pagingList.totalPages || 1}
                            page={crudCompany.pagingList.page || 1}
                            onChange={(e, page) => {
                                crudCompany.setQuery({
                                    ...crudCompany.query,
                                    page: page,
                                });
                            }}
                            color="primary"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default React.memo(UserHmManager);
