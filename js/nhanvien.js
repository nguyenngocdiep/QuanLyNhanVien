//Prototype
function NhanVien(ho,ten,manv,ngaylam,chucvu){
    this.Ho = ho;
    this.Ten = ten;
    this.MaNV = manv;
    this.NgayBatDau = ngaylam;
    this.ChucVu = chucvu;
    this.LuongCoBan = 500;
    this.TinhLuong = function(){
        if(this.ChucVu === "Sếp"){
            return this.LuongCoBan * 3;
        }
        else if(this.ChucVu === "Trưởng phòng"){
            return this.LuongCoBan * 2;
        }
        else{
            return this.LuongCoBan * 1;
        }
    }
}

//Thêm mới ngoài đồi tượng
// NhanVien.prototype.DiaChi = 82 Ung Văn Khiêm