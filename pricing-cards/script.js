// ================= ELEMENTS =================

const billingToggle =
    document.getElementById("billingToggle");

const priceElements =
    document.querySelectorAll(".price-value");

const periodElements =
    document.querySelectorAll(".period");

const monthlyLabel =
    document.getElementById("monthlyLabel");

const yearlyLabel =
    document.getElementById("yearlyLabel");


// ================= UPDATE PRICES =================

function updatePrices() {

    const isYearly =
        billingToggle.checked;


    priceElements.forEach(function(price) {

        if (isYearly) {

            price.textContent =
                price.dataset.yearly;

        } else {

            price.textContent =
                price.dataset.monthly;
        }

    });


    periodElements.forEach(function(period) {

        if (isYearly) {

            period.textContent =
                "/month, billed yearly";

        } else {

            period.textContent =
                "/month";
        }

    });


    // Update active label

    if (isYearly) {

        yearlyLabel.classList.add(
            "active-label"
        );

        monthlyLabel.classList.remove(
            "active-label"
        );

    } else {

        monthlyLabel.classList.add(
            "active-label"
        );

        yearlyLabel.classList.remove(
            "active-label"
        );
    }
}


// ================= TOGGLE EVENT =================

billingToggle.addEventListener(
    "change",
    updatePrices
);


// ================= INITIAL STATE =================

updatePrices();