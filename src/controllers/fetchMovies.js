import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectMongoDB from "../config/dbconfig.js";
import Movie from "../models/MovieModel.js";
import Genre from "../models/GenreModel.js";
import ServerData from "../models/ServerData.js";

dotenv.config();

const fetchMovieDetails = async (slug) => {
    try {
        const response = await axios.get(`https://phimapi.com/phim/${slug}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy chi tiết phim với slug ${slug}`, error);
        return null;
    }
};

const fetchMovies = async () => {
    try {
        const response = await axios.get("https://phimapi.com/v1/api/danh-sach/phim-le");
        const data = response.data.data;

        if (!data || !data.items || data.items.length === 0) {
            console.log("Không có danh sách phim được trả về từ API");
            return;
        }

        const movies = data.items;

        for (const movieData of movies) {
            // Lấy chi tiết phim từ API
            const movieResponse = await fetchMovieDetails(movieData.slug);
            if (!movieResponse) {
                console.log(`Không thể lấy chi tiết phim với slug: ${movieData.slug}`);
                continue;
            }

            const movieDetail = movieResponse.movie;
            const episodes = movieResponse.episodes;

            // Lấy danh sách id của các thể loại phim
            const genreIds = await Promise.all(
                movieDetail.category.map(async (genre) => {
                    let genreDoc = await Genre.findOne({ name: genre.name });
                    if (!genreDoc) {
                        genreDoc = new Genre({ name: genre.name, slug: genre.slug });
                        await genreDoc.save();
                    }
                    return genreDoc._id;
                })
            );

            // Tìm kiếm phim có sẵn trong MongoDB
            const existingMovie = await Movie.findOne({ slug: movieDetail.slug });

            if (existingMovie) {
                // Cập nhật phim nếu đã tồn tại
                await Movie.findByIdAndUpdate(existingMovie._id, {
                    name: movieDetail.name,
                    origin_name: movieDetail.origin_name,
                    type: movieDetail.type || "",
                    poster_url: movieDetail.poster_url || "",
                    genres: genreIds,
                    category: genreIds[0],
                    thumb_url: movieDetail.thumb_url,
                    lang: movieDetail.lang,
                    chieurap: movieDetail.chieurap || "",
                    time: movieDetail.time,
                    quality: movieDetail.quality,
                    year: movieDetail.year,
                    content: movieDetail.content,
                    status: movieDetail.status,
                    actor: movieDetail.actor,
                    director: movieDetail.director,
                    serverData: episodes // Lưu danh sách tập phim
                });
                console.log(`Đã cập nhật phim: ${existingMovie.name}`);
            } else {
                // Tạo phim mới nếu chưa tồn tại
                const movie = new Movie({
                    name: movieDetail.name,
                    slug: movieDetail.slug,
                    origin_name: movieDetail.origin_name,
                    type: movieDetail.type || "",
                    poster_url: movieDetail.poster_url || "",
                    genres: genreIds,
                    category: genreIds[0],
                    thumb_url: movieDetail.thumb_url,
                    lang: movieDetail.lang,
                    chieurap: movieDetail.chieurap || "",
                    time: movieDetail.time,
                    quality: movieDetail.quality,
                    year: movieDetail.year,
                    content: movieDetail.content,
                    status: movieDetail.status,
                    actor: movieDetail.actor,
                    director: movieDetail.director,
                    serverData: episodes // Lưu danh sách tập phim
                });

                await movie.save();
                console.log(`Đã lưu phim mới: ${movie.name}`);
            }
        }

        console.log("Dữ liệu đã được lấy và lưu thành công");
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu", error);
    }
};

const connectAndFetchMovies = async () => {
    try {
        console.log("Bắt đầu script...");

        const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/db_movies";
        await connectMongoDB(dbUrl);

        console.log("Đã kết nối tới MongoDB");
        console.log("Đang lấy dữ liệu và lưu...");

        await fetchMovies();

        await mongoose.connection.close();
        console.log("Kết thúc quá trình kết nối");
    } catch (error) {
        console.error("Lỗi khi khởi động script", error);
    }
};

connectAndFetchMovies();
