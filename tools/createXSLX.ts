import xlsx from "xlsx";
import path from "path";
import { faker } from "@faker-js/faker";

const data = [
  ["MST", "Họ tên", "Giới tính", "Ngày sinh", "CCCD/CMND", "Ngày cấp", "Cấp tại", "SDT", "Địa chỉ", "Công việc", "Nơi làm việc"]
];

function create(){
    for(let i = 0; i < 10; i++){
        data.push([
            `NVE${i + 1}`,
            `Nguyễn ${faker.person.lastName()}`,
            `${faker.helpers.arrayElement(['Nam', 'Nữ', 'nam', 'nữ'])}`,
            `${faker.date.birthdate({ min: 1980, max: 2003, mode: 'year' }).toISOString().slice(0, 10)}`,
            `${faker.string.numeric(9)}`,
            `${faker.date.past({ years: 10 }).toISOString().slice(0, 10)}`,
            `Đường ${faker.location.streetAddress()}`,
            `097${faker.string.numeric(7)}`,
            `Quận ${faker.location.city()}`,
            `${faker.helpers.arrayElement(['Cơ khí', 'Điện tử', 'Vận hành', 'Sản xuất'])}`,
            `Công ty ${faker.company.name()}`
        ]);
    }

    const sheet = xlsx.utils.aoa_to_sheet(data);
    const book = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(book, sheet, "Sheet1");
    xlsx.writeFile(book, path.join(__dirname, "example2.xlsx"));
}

console.log("creating...");
create();
console.log("created!");
