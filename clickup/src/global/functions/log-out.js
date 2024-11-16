import * as UserSlice from "../../utilities/redux/slices/users";
import * as WorkspaceSlice from "../../utilities/redux/slices/workspaces";
import * as SpaceSlice from "../../utilities/redux/slices/workspaces";
import * as ListSlice from "../../utilities/redux/slices/workspaces";
import * as Cache from "../../utilities/cache/cache-manager";

export default async function onLogOut(dispatcher) {
    dispatcher(UserSlice.clear());
    dispatcher(WorkspaceSlice.clear());
    dispatcher(SpaceSlice.clear());
    dispatcher(ListSlice.clear());

    await Cache.removeAll();
}