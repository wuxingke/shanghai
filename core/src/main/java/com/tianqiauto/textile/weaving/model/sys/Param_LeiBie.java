package com.tianqiauto.textile.weaving.model.sys;

import com.tianqiauto.textile.weaving.model.base.Gongxu;
import com.tianqiauto.textile.weaving.model.base.SheBei;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * @ClassName Param_LeiBie
 * @Description TODO
 * @Author xingxiaoshuai
 * @Date 2019-02-26 14:59
 * @Version 1.0
 **/

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "sys_param_leibie")
public class Param_LeiBie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "gongxu_id")
    private Gongxu gongxu;

    @ManyToOne
    @JoinColumn(name = "jixing_id")
    private Gongxu jixing;


    private String name;  //类别名称

    private Integer xuhao;  //参数类别展示顺序


}
