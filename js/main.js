var dsNV =[];

function getEl(id){
   return document.getElementById(id);
}

function FormValidation(){
    var kiemtra = true;
    if(!KiemTraRong("ho","thongBaoHo","Vui lòng nhập họ!")){
        kiemtra = false;
    }
    else{
        if(!KiemTraDinhDangChu("ho","thongBaoHo","Họ phải là chữ!")){
            kiemtra = false;
        }
    }
    if(!KiemTraRong("ten","thongBaoTen","Vui lòng nhập tên!")){
        kiemtra = false;
    }
    if(!KiemTraChucVu()){
        kiemtra = false;
    }
    if(!KiemTraMa(2,8)){
        kiemtra = false;
    }
    return kiemtra;
}

function themNhanVien(){

    if(FormValidation()){
        var hoNV = getEl("ho").value;
        var tenNV = getEl("ten").value;
        var msNV = getEl("msnv").value;
        var ngayLam = getEl("datepicker").value;
        var chucVu = getEl("chucvu").value;
        var nhanVienMoi = new NhanVien(hoNV,tenNV,msNV,ngayLam,chucVu);
        // console.log(nhanVienMoi)
        dsNV.push(nhanVienMoi);
        //Tạo bảng
        taoBang(dsNV);
    }

    
}

//Hàm tạo bảng nhân viên
function taoBang(arr){
    var content ="";
    for(var i=0;i<arr.length;i++){
        var nhanVien = arr[i];
        content += `
            <tr>
                <td>${i + 1}</td>
                <td>${nhanVien.Ten}</td>
                <td>${nhanVien.MaNV}</td>
                <td>${nhanVien.ChucVu}</td>
                <td>${nhanVien.TinhLuong()}</td>
                <td>
                    <button class="btn btn-success" onclick="xoaNhanVien('${i}')">Xóa</button>
                    <button class="btn btn-info"
                     data-manhanvien = "${nhanVien.MaNV}"
                     data-ho = "${nhanVien.Ho}"
                     data-ten = "${nhanVien.Ten}"
                     data-chucvu = "${nhanVien.ChucVu}"
                     data-ngaylam ="${nhanVien.NgayBatDau}"
                     onclick = "HienThiLenForm(event)"
                     >Cập nhật</button>
                </td>
            </tr>
        `
    }
    getEl("tbodyNhanVien").innerHTML = content;
}

function xoaNhanVien(index){
    Swal({
        title: 'Ban có muốn xóa không?',
        text: "Bạn không thể quay trở lại!",
        type: 'warning', //là icon
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'blue',
        confirmButtonText: 'Ok!'
      }).then((result) => {
        if (result.value) {
          Swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      
    dsNV.splice(index,1);
    taoBang(dsNV);
} 

// Hàm tìm kiếm theo mã nhân viên
function timKiemTheoMa(){
    var danhSachCanTim = [];
    var keyword = getEl("txtSearch").value;
    var index = findIndex(dsNV,keyword);
    if(index !== -1){
        danhSachCanTim.push(dsNV[index]);
        return danhSachCanTim;
    }
}

//Hàm tìm kiếm theo tên nhân viên
function timKiemTheoTen(){
    var danhSachCanTim = [];
    var keyword = getEl("txtSearch").value;

    for(var i =0;i<dsNV.length;i++){
        if(dsNV[i].Ten.toLowerCase().indexOf(keyword.toLowerCase().trim()) !== -1){
            danhSachCanTim.push(dsNV[i]);
        }
    }
    return danhSachCanTim;
}

//Hiển thị theo mã hoặc tên nhân viên
function timKiemNhanVien(){
    // var danhSachCanTim = [];
    // var keyword = getEl(txtSearch).value;
    // // var index = findIndex(dsNV,keyword);
    // for(var i = 0;i<dsNV.length;i++){
    //     if(dsNV[i].MaNV === keyword){
    //         danhSachCanTim.push(dsNV[i]);
    //         taoBang(danhSachCanTim);
    //     }
    //     else if(dsNV[i].Ten.toLowerCase().indexOf(keyword.toLowerCase().trim()) !== -1){
    //         danhSachCanTim.push(dsNV[i]);
    //         taoBang(danhSachCanTim);
    //     }
    //     else{
    //         Swal({
    //                 type: 'error',
    //                 title: 'Oops...',
    //                 text: 'Something went wrong!',
    //                 footer: '<a href>Why do I have this issue?</a>'
    //             })
    //     }
    // }

    if(timKiemTheoMa()){
        dsHienThi = timKiemTheoMa();
    }
    else if(timKiemTheoTen()){
        dsHienThi = timKiemTheoTen();
    }


    if(dsHienThi.length===0){
        Swal({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
        })
    }
    else{
        taoBang(dsHienThi);
    }
}

function findIndex(arr,ma){
    for(var i=0;i<arr.length;i++){
        if(arr[i].MaNV === ma){
            return i;
        }
    }
    return -1;
}
//Cập nhật
//bước 1: Hiển thị thông tin người dùng lên form
function HienThiLenForm(event){
    var button = event.target;
    var ma = button.getAttribute("data-manhanvien");
    var ho = button.getAttribute("data-ho");
    var ten = button.getAttribute("data-ten");
    var chucvu = button.getAttribute("data-chucvu");
    var ngaylam = button.getAttribute("data-ngaylam");

    getEl("ho").value = ho;
    getEl("ten").value = ten;
    getEl("msnv").value = ma;
    getEl("datepicker").value = ngaylam;
    getEl("chucvu").value = chucvu;

    getEl("msnv").setAttribute("readonly",true);
    getEl("btnThemNV").style.display =  "none";
    getEl("btnCapNhatNV").style.display = "block";
}
//Bước 2: Lấy thông tin người dùng đã sửa,
//thay thế nhân viên nhân cũ thành viên mới (DSNV)
function CapNhatNhanVien(){
    var hoNV = getEl("ho").value;
    var tenNV = getEl("ten").value;
    var msNV = getEl("msnv").value;
    var ngayLam = getEl("datepicker").value;
    var chucVu = getEl("chucvu").value;

    var nhanVienCapNhat = new NhanVien(hoNV,tenNV,msNV,ngayLam,chucVu);
    //Lấy vị trí của nhân viên cần thay thế
    var index = findIndex(dsNV,msNV);
    //Thay thế nhân viên cũ bằng nhân viên mới cập nhật
    dsNV[index] = nhanVienCapNhat;
    taoBang(dsNV);
}

//Kiễm tra rỗng
function KiemTraRong(idField,idThongBao,thongBaoContent){
    var bool = true;
    var value = getEl(idField).value;
    if(value === ""){
        getEl(idThongBao).innerHTML = thongBaoContent;
        bool = false;
    }
    else{
        getEl(idThongBao).innerHTML = "";
    }
    return bool;
}

//Kiễm tra định dạng chữ
function KiemTraDinhDangChu(idField,idThongbao,thongBaoContent){
    var bool = true;
    var value = getEl(idField).value;
    var patt = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
    if(!patt.test(value)){
        getEl(idThongbao).innerHTML = thongBaoContent;
        bool = false;
    }
    else{
        getEl(idThongbao).innerHTML = "";
    }
    return bool;
}
//Kiễm tra chức vụ
function KiemTraChucVu(){
    var bool = true;
    if(getEl("chucvu").selectedIndex == 0){
        getEl("thongBaoChucVu").innerHTML = "Vui lòng chọn chức vụ";
        bool = false;
    }
    else{
        getEl("thongBaoChucVu").innerHTML = "";
    }
    return bool;
}

//Kiễm tra mã
function KiemTraMa(min,max){
    var bool = true;
    var value = getEl("msnv").value;
    if(value.length < min || value.length > max){
        getEl("thongBaoMa").innerHTML = "Mã nhân viên phải có từ " + min + " tới " + max + " kí tự";
        bool = false;
    }
    else{
        getEl("thongBaoMa").innerHTML = "";
    }
    return bool;
}
getEl('btnThemNV').addEventListener("click",themNhanVien);
getEl("btnSearch").addEventListener('click',timKiemNhanVien);
getEl("btnCapNhatNV").addEventListener("click",CapNhatNhanVien);