import Header from "./Header";
import Footer from "./Footer";
import StudentsTable from "./StudentsTable";
import AddRemovStudent from "./AddRemovStudent";
import NoMatchesFound from "./NoMatchesFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function GenericConstructor() {
    return (
        <>
          <div className="containerMain">
            <Router>
              <Routes>
                <Route path="/" element={<Header />}>

                  <Route index element={<StudentsTable />} />

                  <Route path="student" element={<AddRemovStudent />}/>

                  <Route path="*" element={<NoMatchesFound />} />

                </Route>
              </Routes>
            </Router>
                
            <Footer>Footer</Footer>
            
          </div>
        </>

    );
}

export default GenericConstructor;