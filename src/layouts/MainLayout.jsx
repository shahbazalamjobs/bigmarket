import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ScrollToTop from "@/components/layout/ScrollToTop";
import PageLoader from "@/components/common/PageLoader";

function MainLayout() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <main className="min-h-screen py-8">
        <Container>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;