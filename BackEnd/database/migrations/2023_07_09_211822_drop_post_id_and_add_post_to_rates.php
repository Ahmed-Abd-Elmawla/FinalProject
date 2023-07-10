<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('rate', function (Blueprint $table) {
            $table->dropForeign('rate_post_id_foreign');
        });
        Schema::table('rate', function (Blueprint $table) {
            $table->dropColumn('post_id');
        });

        Schema::table('rate', function (Blueprint $table) {
            $table->unsignedBigInteger('post_id')->after('owner_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rate', function (Blueprint $table) {
            $table->foreign('post_id')->references('id')->on('posts');
        });
        Schema::table('rate', function (Blueprint $table) {
            $table->dropColumn('post_id');
        });

        Schema::table('rate', function (Blueprint $table) {
            $table->unsignedBigInteger('post_id')->after('owner_id');
        });
    }
};
