import Select from "react-select";
import { useThemeStore } from "./Store/theme";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Test } from "./Pages/test";
import { ReactQueryDevtools } from 'react-query/devtools'
import { Login } from "./Pages/Login";
 const queryClient = new QueryClient()

function App() {
    const themes = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
    ].map((theme) => ({ value: theme, label: theme }));

    // const [theme, setTheme] = useState("");

    const theme = useThemeStore((state) => state.theme);

    const setTheme = useThemeStore((state) => state.setTheme);

    const onThemeChange = (theme: string) => {
        document.getElementsByTagName("html")[0].setAttribute("data-theme", theme);
        window.localStorage.setItem("sb-react-daisyui-preview-theme", theme);

        setTheme(theme);
    };

    return <Login/>;
    

    return (
        <QueryClientProvider client={queryClient}>

            <div className="py-6"><Test/></div>

        <div className="" data-theme={theme}>
            <Select
                options={themes}
                onChange={(selected) => selected?.value && onThemeChange(selected.value)}
                value={{ value: theme, label: theme }}
                isMulti={false}
                className={`bg-primary text-warning `}
                classNames={{ menuList: () => "bg-secondary" }}
            />
            <div className="flex p-4">
                <button className="btn m-auto">Click to bounce</button>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Remember me</span>
                    <input type="checkbox" className="toggle" />
                </label>
            </div>
            <label htmlFor="my-modal" className="btn">
                open modal
            </label>
            <input type="checkbox" id="my-modal" className="modal-toggle" />

            <div className="modal">
                    <div className="card w-96 bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Cookies!</h2>
                            <p>We are using cookies for no reason.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Accept</button>
                                <button className="btn btn-ghost" >Deny</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <ReactQueryDevtools/>
        </QueryClientProvider>
    );
}

export default App;
