
// ACTIVE BILL NAME BUTTON & SHOW ACTIVE BILL FORM
const buttons = document.querySelectorAll('[data-target]');
const billForms = document.querySelectorAll('[data-form]');
const tBody = document.querySelectorAll('.bill-form table tbody');    
const addRowBtn = document.querySelectorAll('.bill-form #add_row');     // Add row in mortgage form btn
    
// ACTIVE INACTIVE BUTTON & TABS
    buttons.forEach(btn => {
       btn.addEventListener('click', () => {
            //Active button
            const targetForm = document.querySelector(btn.dataset.target);
            
            buttons.forEach(btn => {
                btn.classList.remove('active-btn');
            })

            btn.classList.add('active-btn');
            // active form to the corresponding button
            billForms.forEach(billForm => {
                billForm.classList.remove('active-form');
            })

            targetForm.classList.add('active-form');
            totalAmount(targetForm.querySelector('.tbody'));    // Recount total amount 
    })
    })

    // ADD ROW in BILL FORM
    addRowBtn.forEach(addBtn => {
        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let tbody = e.target.closest('.bill-form').querySelector('tbody');
            let tr = createRow();
                tbody.appendChild(tr);
                autoCounter(tbody);     //pass the table body to autocounter
        });
    })

  // DELETE ROW OF BILL FORM 
    tBody.forEach(tbdy => {
        tbdy.addEventListener('click', (e) => {
            e.preventDefault();
            // console.log(e.target);  // clicked element
            // console.log(e.target.tagName);  //tag name 
            if(e.target.tagName === "BUTTON") {
                e.target.closest('tr').remove();  // remove parent tr
                autoCounter(tbdy)   // pass the clicked table body the autocounter
                totalAmount(tbdy)   // Re-count total amount
            }
        })
    })

    // CREATE ROW 
    const createRow = function () {
        const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>10</td>
                    <td><input name="pay_order_title" type="text" value="" placeholder='Service Name'></td>
                    <td><input name="satisfaction_amount" type="number" value="" placeholder="Amount"></td>
                    <td><button>Delete</button></td>
                `;
        return tr;
    }
    //UPDATE ROW SL NO.
    const autoCounter = function (targetBtn) {
        const slNo = targetBtn.querySelectorAll('tr td:first-child');    //SL No. element
        let counter = 1

        slNo.forEach(sl => {
            sl.innerHTML = counter;
            counter++
        })
    }

    // COUNT TOTAL BILL
    const totalAmount = function (tbody = document.querySelector('.tbody')) {
        const billAmountFields = tbody.querySelectorAll('input[type="number"]');
        const totalAmount = tbody.closest('table').querySelector('#total_amount input');
        let totalCount = 0;
        billAmountFields.forEach(b => {
            totalCount += parseInt(b.value, 10) || 0;
        })
        totalAmount.value = totalCount
    }
    totalAmount()   //initial total amount count

    // RE-COUNT TOTAL BILL AFTER ADD ROW
    tBody.forEach(tbd => {
        tbd.addEventListener('input', (e) => {
            if(e.target.matches("input[type='number']")) {
                totalAmount(tbd)
                console.log(e.target.value);
                
            }
        })
    })