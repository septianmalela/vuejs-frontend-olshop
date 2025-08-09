<template>
  <div class="container">
    <footer class="py-5">
      <div class="row">
        <div class="col-6 col-md-2 mb-3">
          <img src="@/assets/tks.png" alt="img" class="img-thumbnail">
          <div class="d-flex justify-content-center align-items-center pt-3">
            <div class="rounded bg-light mx-2">
              <a href="https://facebook.com" class="text-black">
                <i class="bi bi-facebook"></i>
              </a>
            </div>
            <div class="rounded bg-light mx-2">
              <a href="https://youtube.com" class="text-black">
                <i class="bi bi-youtube"></i>
              </a>
            </div>
            <div class="rounded bg-light mx-2">
              <a href="https://instagram.com" class="text-black">
                <i class="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3 mb-3">
          <h5>Ultras</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-body-secondary">About Us</a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-body-secondary">Conditions</a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-body-secondary">Our Journals</a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-body-secondary">Careers</a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-body-secondary">Affiliate Programme</a>
            </li>
            <li class="nav-item mb-2">
              <a href="#" class="nav-link p-0 text-body-secondary">Ultras Press</a>
            </li>
          </ul>
        </div>
          <div class="col-6 col-md-3 mb-3">
            <h5>Customer Service</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">FAQ</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">Contact</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">Privacy Policy</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">Returns & Refunds</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">Cookie Guidelines</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link p-0 text-body-secondary">Delivery Information</a>
              </li>
            </ul>
          </div>
          <div class="col-md-4 mb-3">
            <form>
              <h5>Subscribe Us</h5>
              <p>Subscribe to our newsletter to get updates about our grand offers</p>
              <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                <label for="newsletter1" class="visually-hidden">Email address</label>
                <input id="newsletter1" type="email" class="form-control" placeholder="Email address">
                <button class="btn btn-dark" type="button">Subscribe</button>
              </div>
            </form>
          </div>
      </div>
      <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>© 2025 Company, Inc. All rights reserved.</p>
        <ul class="list-unstyled d-flex">
          <li class="ms-3">
            <a class="link-body-emphasis" href="#" aria-label="Instagram">
              <svg class="bi" width="24" height="24">
                <use xlink:href="#instagram"></use>
              </svg>
            </a>
          </li>
          <li class="ms-3">
            <a class="link-body-emphasis" href="#" aria-label="Facebook">
              <svg class="bi" width="24" height="24" aria-hidden="true">
                <use xlink:href="#facebook"></use>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "FooterComponent"
  }
</script>
