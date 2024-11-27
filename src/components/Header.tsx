import { verifySession } from "@/lib/session";
import ToolbarDynamic from "./motion-ui/DynamicHeader";
const Header = async () => {
  const user = await verifySession();
  
  return <ToolbarDynamic user={user} />;
};

export default Header;
